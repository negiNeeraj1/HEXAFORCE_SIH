#!/usr/bin/env node

/**
 * 🧪 Test MongoDB Atlas Connection
 * Quick test to verify your Atlas connection works
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: process.env.ENV_FILE || '.env' });

const testConnections = async () => {
  const connections = [
    {
      name: 'Local MongoDB (Default)',
      uri: 'mongodb://localhost:27017/study-ai'
    },
    {
      name: 'Local MongoDB (Port 27018)',
      uri: 'mongodb://localhost:27018/study-ai'
    },
    {
      name: 'Docker MongoDB (Authenticated)',
      uri: 'mongodb://admin:hexaforce123@localhost:27017/study-ai?authSource=admin'
    },
    {
      name: 'Environment Variable',
      uri: process.env.MONGODB_URI || process.env.MONGO_URI
    }
  ];

  console.log('🔍 Testing MongoDB Connections...\n');

  for (const connection of connections) {
    if (!connection.uri) {
      console.log(`❌ ${connection.name}: No URI provided`);
      continue;
    }

    try {
      console.log(`🔌 Testing: ${connection.name}`);
      console.log(`📍 URI: ${connection.uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
      
      const startTime = Date.now();
      await mongoose.connect(connection.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 10000,
      });
      
      const endTime = Date.now();
      console.log(`✅ SUCCESS! Connected in ${endTime - startTime}ms`);
      
      // Test basic operations
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      console.log(`📊 Collections found: ${collections.length}`);
      
      await mongoose.disconnect();
      console.log('🔌 Disconnected\n');
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.message}\n`);
    }
  }

  console.log('🎯 Connection test completed!');
  console.log('\n💡 Tips:');
  console.log('- If local connections fail, make sure MongoDB is running');
  console.log('- For Docker: run "docker-compose up -d" in the Backend directory');
  console.log('- For different ports: start MongoDB with --port flag');
  console.log('- For authentication: create users in MongoDB');
};

// Run the test
testConnections().catch(console.error);


