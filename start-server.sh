#!/bin/sh

if [ -f ./build/service ]; then
  PID=$(lsof -n -i :3000 | grep LISTEN | awk '{print $2;}')
  if [ $PID ]; then
    kill -9 $PID
  fi
  ./build/service &
fi
