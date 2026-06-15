#!/bin/bash
# Persistent server runner - auto-restarts if server dies
cd /home/z/my-project

while true; do
  echo "[$(date)] Starting Next.js dev server..." >> /home/z/my-project/server-daemon.log
  bun run dev >> /home/z/my-project/dev.log 2>&1
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE, restarting in 3s..." >> /home/z/my-project/server-daemon.log
  sleep 3
done
