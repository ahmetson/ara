#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script prefix
PREFIX="[wait-for-mongo.sh]"

# Wait for MongoDB to be ready
MAX_ATTEMPTS=30
ATTEMPT=0

# Check docker access first
if ! docker ps &>/dev/null; then
  echo -e "${RED}${PREFIX} Error: Cannot access Docker. Please ensure you have Docker permissions.${NC}" >&2
  echo -e "${YELLOW}${PREFIX} Run: sudo usermod -aG docker $USER && newgrp docker${NC}" >&2
  exit 1
fi

echo -e "${CYAN}${PREFIX} Waiting for MongoDB to be ready...${NC}"

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  # Check if container is healthy using docker inspect
  HEALTH=$(docker inspect --format='{{.State.Health.Status}}' ara-mongo 2>/dev/null)
  
  if [ "$HEALTH" = "healthy" ]; then
    echo -e "${GREEN}${PREFIX} MongoDB is ready!${NC}"
    exit 0
  fi
  
  # Also check if container exists and is running
  if ! docker ps --format '{{.Names}}' | grep -q ara-mongo; then
    if [ $ATTEMPT -eq 0 ]; then
      echo -e "${YELLOW}${PREFIX} MongoDB container not found. Make sure docker compose up was successful.${NC}" >&2
    fi
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
  echo -e "${BLUE}${PREFIX} Attempt $ATTEMPT/$MAX_ATTEMPTS - MongoDB not ready yet, waiting...${NC}"
  sleep 2
done

echo -e "${RED}${PREFIX} MongoDB failed to become ready after $MAX_ATTEMPTS attempts${NC}"
exit 1

