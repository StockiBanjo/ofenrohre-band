#!/bin/bash
cd "$(dirname "$0")/ofenrohre.de"
echo "Server startet auf http://localhost:8080"
python3 -m http.server 8080 &
echo $! > /tmp/ofenrohre-server.pid
echo "PID: $!"
