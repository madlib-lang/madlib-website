#!/bin/sh

PID=$(lsof -n -i :3000 | grep LISTEN | awk '{print $2;}')

kill -9 $PID 2>/dev/null && echo 'restarting server' || echo 'not running' && ./build/service
