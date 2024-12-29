#!/bin/bash
set -o errexit

# Check if a rollback is requested
if [ "$ROLLBACK_MIGRATIONS" = "true" ]; then
  echo "Rollback flag detected. Running rollback-migrations.sh..."
  ./rollback-migrations.sh
fi

# Proceed with normal deployment steps
./run-migrations.sh