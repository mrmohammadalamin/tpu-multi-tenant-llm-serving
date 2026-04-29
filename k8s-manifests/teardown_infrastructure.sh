#!/bin/bash

# Configuration
CLUSTER_NAME="tpu-sprint-cluster"
ZONE="us-central1-c"

echo "🛑 Starting Infrastructure Teardown to Save Costs..."

# 1. Delete the TPU Node Pool (This is the most expensive part)
echo "Deleting TPU Node Pool..."
gcloud container node-pools delete tpu-v5e-pool \
    --cluster=$CLUSTER_NAME \
    --zone=$ZONE \
    --quiet

# 2. Optionally delete the cluster (uncomment if you want to wipe everything)
# echo "Deleting GKE Cluster..."
# gcloud container clusters delete $CLUSTER_NAME --zone $ZONE --quiet

echo "✅ TPU nodes have been removed. You are no longer being charged for TPUs."
