from fastapi import FastAPI, HTTPException, Request
import httpx
import uvicorn
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(title="Multi-Tenant TPU LLM Gateway")

# Configuration
VLLM_URL = os.getenv("VLLM_URL", "http://vllm-service:80")

class LoRARegistration(BaseModel):
    name: str
    path: str # HuggingFace path or GCS path
    tenant_id: str

class ChatRequest(BaseModel):
    model: str # The LoRA name registered
    messages: List[dict]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 512

# In-memory storage for demo (use Redis/DB for production)
lora_registry = {}

@app.get("/")
async def root():
    return {"status": "online", "engine": "vLLM-TPU", "tenants": len(lora_registry)}

@app.post("/register_lora")
async def register_lora(reg: LoRARegistration):
    """
    Registers a LoRA adapter. In vLLM, we can load these dynamically.
    For this demo, we store the mapping.
    """
    lora_registry[reg.name] = {
        "path": reg.path,
        "tenant_id": reg.tenant_id
    }
    return {"message": f"LoRA {reg.name} registered for tenant {reg.tenant_id}"}

@app.post("/v1/chat/completions")
async def chat_proxy(request: ChatRequest):
    """
    Proxies chat requests to vLLM. 
    If the 'model' matches a registered LoRA, it passes the correct lora name to vLLM.
    """
    if request.model in lora_registry:
        vllm_payload = request.dict()
        # vLLM expects the LoRA name as the model name
        # It handles loading if configured correctly
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{VLLM_URL}/v1/chat/completions",
                    json=vllm_payload,
                    timeout=60.0
                )
                return response.json()
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))
    else:
        # Fallback to base model if LoRA not found
        vllm_payload = request.dict()
        vllm_payload["model"] = "google/gemma-2-9b" # Base model
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{VLLM_URL}/v1/chat/completions",
                json=vllm_payload
            )
            return response.json()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
