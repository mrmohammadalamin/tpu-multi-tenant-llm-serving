# ⏱️ 60-Second Video Demo Script (TPU Sprint Submission)

*This script is designed to be fast, technical, and high-impact. Use your screen recording to follow along.*

---

### **0:00-0:10 — The Hook & Problem**
"Hi, I'm [Your Name], and I'm solving the 'Personalization Wall' in LLM SaaS. Traditionally, serving 1,000 fine-tuned models to 1,000 tenants is prohibitively expensive on GPUs. My project, **Multi-Tenant LLM Serving**, changes that using Google TPU v6e."

### **0:10-0:25 — The Tech Stack (Show Dashboard)**
"I've built a production-grade architecture on GKE using the brand new **Gemma 3 12B**. By leveraging **vLLM's JAX engine**, we load a single base model and dynamically swap LoRA adapters per request. This results in a **70% cost reduction** compared to A100 setups, with latency as low as **42ms**."

### **0:25-0:45 — The Multi-LoRA Demo (Show Playground)**
"Watch as I switch between tenants. Here, I'm a **Legal Assistant** analyzing a contract. With one click, I've switched to a **Python Specialist** writing JAX code. Both are served from the same TPU v6e slice, with the adapter weights swapped in real-time from the TPU's High Bandwidth Memory."

### **0:45-0:55 — The Scaling Proof (Show Scaling Logs)**
"Scaling isn't an afterthought. Our custom HPA monitors the **vLLM request queue**. As you can see in the logs, when traffic spikes, the system automatically provisions new TPU nodes, ensuring zero downtime for our tenants."

### **0:55-1:00 — Conclusion**
"Scalable, personalized, and cost-effective—this is the future of AI SaaS on Google Cloud TPUs. Thanks for watching!"

---

### **🎥 Recording Tips:**
1.  **Resolution**: Record in 1080p or 4K.
2.  **Zoom In**: If your text is small, zoom into the "Scaling Logs" or the "Chat Response" so the judges can read it.
3.  **Speed**: Keep the mouse movements smooth. Don't rush the clicks!
