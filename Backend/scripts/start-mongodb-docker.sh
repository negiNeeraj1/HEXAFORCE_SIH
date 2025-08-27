#!/bin/bash

# Start MongoDB using Docker Compose
echo "🐳 Starting MongoDB with Docker Compose..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start MongoDB and Mongo Express
docker-compose up -d

echo "✅ MongoDB started successfully!"
echo "📊 MongoDB is running on: mongodb://localhost:27017"
echo "🌐 Mongo Express (Web UI) is available at: http://localhost:8081"
echo "👤 Username: admin"
echo "🔑 Password: hexaforce123"
echo ""
echo "To stop MongoDB: docker-compose down"
echo "To view logs: docker-compose logs -f mongodb"


