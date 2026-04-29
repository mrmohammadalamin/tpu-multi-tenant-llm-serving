#!/bin/bash

# Configuration
PROJECT_ID=$(gcloud config get-value project)
CLUSTER_NAME="tpu-sprint-cluster"
REGION="us-central1" # TPU v5e is commonly available here
ZONE="us-central1-c"

echo "🚀 Starting Infrastructure Setup for TPU Sprint..."

# 1. Enable necessary APIs
echo "Enabling APIs..."
gcloud services enable container.googleapis.com tpu.googleapis.com

# 2. Create GKE Cluster with TPU support (if it doesn't exist)
# Using Autopilot is easier for many, but for TPU v5e, Standard gives more control.
# We'll assume a Standard cluster for maximum optimization control.
if ! gcloud container clusters describe $CLUSTER_NAME --zone $ZONE > /dev/null 2>&1; then
    echo "Creating GKE Cluster..."
    gcloud container clusters create $CLUSTER_NAME \
        --zone $ZONE \
        --workload-pool=$PROJECT_ID.svc.id.goog \
        --num-nodes=1
else
    echo "Cluster already exists."
fi

# 3. Create TPU v5e Node Pool (Optimized for Cost)
# We use --provisioning-model=SPOT to save ~60-90% on costs.
# TPU v5e (ct5lp-hightpu-4t) is ~$1.20/hr, SPOT is significantly cheaper (~$0.36/hr).
echo "Creating SPOT TPU v5e Node Pool..."
gcloud container node-pools create tpu-v5e-pool \
    --cluster=$CLUSTER_NAME \
    --zone=$ZONE \
    --machine-type=ct5lp-hightpu-4t \
    --num-nodes=1 \
    --tpu-topology=2x2 \
    --provisioning-model=SPOT # CRITICAL FOR COST OPTIMIZATION

echo "💰 Cost Tip: This setup should cost < $10/day on SPOT."
echo "✅ Infrastructure commands generated. Use 'kubectl apply -f k8s-manifests/' next."
