#!/bin/bash
echo "Waiting for MongoDB to start..."
while ! nc -z mongodb 27017; do
  sleep 1
done

echo "Running seed script..."
node /db/script/seed.js