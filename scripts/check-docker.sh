#!/bin/bash

# Check if docker is accessible
if docker ps &>/dev/null; then
  exit 0
fi

# If not accessible, check if it's a permission issue
if [ -w /var/run/docker.sock ] 2>/dev/null || docker ps &>/dev/null; then
  exit 0
fi

echo "Error: Docker permission denied." >&2
echo "" >&2
echo "To fix this, run one of the following:" >&2
echo "  1. Add your user to the docker group: sudo usermod -aG docker $USER" >&2
echo "     Then log out and log back in, or run: newgrp docker" >&2
echo "  2. Or use sudo (not recommended): sudo docker compose ..." >&2
echo "" >&2
exit 1

