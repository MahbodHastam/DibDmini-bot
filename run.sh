#!/bin/bash

while true; do
  git pull &> /dev/null
  echo 'pulled'
  sleep 60
done