#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMOTE="gdrive:Ofenrohre"

echo "Synchronisiere $SCRIPT_DIR -> $REMOTE ..."
rclone sync "$SCRIPT_DIR" "$REMOTE" \
    --exclude ".git/**" \
    --progress

echo "Fertig."
