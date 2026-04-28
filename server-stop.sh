#!/bin/bash
PID_FILE=/tmp/ofenrohre-server.pid
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill "$PID" 2>/dev/null; then
        echo "Server (PID $PID) gestoppt."
    else
        echo "Prozess $PID läuft nicht mehr."
    fi
    rm "$PID_FILE"
else
    # Fallback: per Port suchen
    PID=$(lsof -ti tcp:8080 2>/dev/null)
    if [ -n "$PID" ]; then
        kill "$PID" && echo "Server (PID $PID) gestoppt."
    else
        echo "Kein Server auf Port 8080 gefunden."
    fi
fi
