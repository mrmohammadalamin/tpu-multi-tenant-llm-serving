# Why TPUs Win for Multi-LoRA LLM SaaS

Building a Software-as-a-Service (SaaS) that provides personalized AI models for thousands of customers is an infrastructure nightmare. Traditionally, you'd either:
1.  **Spin up a GPU per customer**: Extremely expensive and wasteful.
2.  **Shared GPU with different models**: High latency due to model swapping.

### The Solution: Multi-LoRA on TPUs

This project leverages **Google Cloud TPUs** and **vLLM** to solve this using a "Base Model + Adapters" architecture.

#### 1. Hardware-Intimate Memory Management
TPU v5e is designed for high-throughput inference. By using **PagedAttention** (optimized for XLA), we can keep the base model (e.g., Gemma 2 9B) in the TPU's High Bandwidth Memory (HBM) and only load the small LoRA adapters (megabytes, not gigabytes) on demand.

#### 2. Cost Optimization: TPU v5e vs. GPU
In our benchmarking, a **TPU v5e (ct5lp-hightpu-4t)** costs significantly less than a comparable A100/H100 setup while providing superior performance for LoRA-heavy workloads.
- **TPU v5e**: ~$1.20/hour (approximate spot/committed pricing).
- **A100 80GB**: ~$3.50 - $4.00/hour.

#### 3. Smart Scaling with GKE
Standard scaling (CPU/Memory) is useless for LLMs because the memory is usually pre-allocated. Our architecture uses **vLLM Metrics** to scale based on **Request Queue Length**. If more than 5 requests are waiting, GKE automatically provisions a new TPU node.

### Challenge Parts Solved:
- [x] **Multi-tenant Isolation**: Serving different customers from the same physical chip without crosstalk.
- [x] **Zero-Downtime Adapter Loading**: Adding new LoRAs via API without restarting the server.
- [x] **Semantic Autoscaling**: Proving that TPUs can scale horizontally based on actual model load.

### How to Reproduce
1.  Run `k8s-manifests/setup_infrastructure.sh`.
2.  Deploy the vLLM server: `kubectl apply -f k8s-manifests/vllm-deployment.yaml`.
3.  Launch the SaaS Dashboard to manage your tenants.
