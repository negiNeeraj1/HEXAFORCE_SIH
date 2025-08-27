# MongoDB Setup Guide for Different Projects/Users

## Overview
This guide explains how to configure MongoDB for different scenarios when working with multiple projects or users.

## Scenario 1: Multiple Local MongoDB Instances

### Option A: Different Ports
If you have MongoDB running on different ports for different projects:

```bash
# Start MongoDB on default port (27017) for Project A
mongod --port 27017 --dbpath /path/to/projectA/data

# Start MongoDB on different port (27018) for Project B  
mongod --port 27018 --dbpath /path/to/projectB/data
```

**Configuration:**
```env
# For Project A (default)
MONGODB_URI=mongodb://localhost:27017/study-ai

# For Project B (different port)
MONGODB_URI=mongodb://localhost:27018/study-ai
```

### Option B: Different Database Names
Use the same MongoDB instance but different database names:

```env
# Project A
MONGODB_URI=mongodb://localhost:27017/project-a-db

# Project B  
MONGODB_URI=mongodb://localhost:27017/project-b-db
```

## Scenario 2: MongoDB with Authentication

### Setup Authentication
```bash
# Connect to MongoDB
mongosh

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "adminpassword",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Create project-specific user
use study-ai
db.createUser({
  user: "studyuser",
  pwd: "studypassword", 
  roles: ["readWrite"]
})
```

### Configuration with Auth
```env
# With authentication
MONGODB_URI=mongodb://studyuser:studypassword@localhost:27017/study-ai

# Or with admin user
MONGODB_URI=mongodb://admin:adminpassword@localhost:27017/study-ai
```

## Scenario 3: Docker MongoDB (Recommended for Multi-Project)

### Create Docker Compose for Each Project
```yaml
# docker-compose.yml for Project A
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb-project-a
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: study-ai
    volumes:
      - mongodb_data_a:/data/db

volumes:
  mongodb_data_a:
```

```yaml
# docker-compose.yml for Project B  
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongodb-project-b
    ports:
      - "27018:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: study-ai
    volumes:
      - mongodb_data_b:/data/db

volumes:
  mongodb_data_b:
```

### Run Different Projects
```bash
# Project A
cd /path/to/project-a
docker-compose up -d

# Project B
cd /path/to/project-b  
docker-compose up -d
```

## Scenario 4: MongoDB Atlas (Cloud - Best for Collaboration)

### Benefits:
- No local setup required
- Multiple users can access same database
- Automatic backups
- Scalable

### Configuration:
```env
# Use the existing Atlas configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/study-ai?retryWrites=true&w=majority
```

## Quick Setup Scripts

### 1. Create Environment-Specific Configs
```bash
# Create different .env files for different scenarios
cp env.local env.local-project-a
cp env.local env.local-project-b
cp env.local env.local-docker
```

### 2. Start Scripts
```bash
# start-project-a.sh
#!/bin/bash
export NODE_ENV=development
export MONGODB_URI=mongodb://localhost:27017/project-a-db
npm start

# start-project-b.sh  
#!/bin/bash
export NODE_ENV=development
export MONGODB_URI=mongodb://localhost:27018/project-b-db
npm start
```

## Testing Your Connection

### 1. Test MongoDB Connection
```bash
# Test if MongoDB is running
mongosh --port 27017
mongosh --port 27018

# Or test specific database
mongosh "mongodb://localhost:27017/study-ai"
```

### 2. Test from Your Application
```bash
# Run the test script
node scripts/test-mongodb-connection.js
```

## Troubleshooting

### Common Issues:

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :27017
   
   # Kill the process
   taskkill /PID <process_id> /F
   ```

2. **Permission Denied**
   ```bash
   # Run MongoDB as administrator or fix permissions
   sudo chown -R $USER /data/db
   ```

3. **Connection Timeout**
   - Check if MongoDB is running
   - Verify port number
   - Check firewall settings

### Debug Connection:
```javascript
// Add this to your db.js for debugging
console.log("🔍 Full connection string:", mongoUri);
console.log("🔍 Environment:", process.env.NODE_ENV);
```

## Recommended Approach for Your Project

For your HEXAFORCE_SIH project, I recommend:

1. **Development**: Use Docker MongoDB (Scenario 3)
2. **Testing**: Use MongoDB Atlas (Scenario 4) 
3. **Production**: Use MongoDB Atlas

This gives you:
- ✅ Isolated environments
- ✅ Easy setup/teardown
- ✅ No conflicts between projects
- ✅ Consistent across team members


