// Configuration file for the StudyAI backend
require('dotenv').config();

const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/study-ai',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_for_study_ai_app_2024',
  jwtExpiresIn: '7d',
  
  // AI API configuration
  googleAiApiKey: process.env.GOOGLE_AI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  
  // CORS configuration
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:3001',
  allowAllOrigins: process.env.ALLOW_ALL_ORIGINS === 'true',
  
  // Database connection settings
  mongodbConnectionTimeout: parseInt(process.env.MONGODB_CONNECTION_TIMEOUT) || 5000,
  mongodbSocketTimeout: parseInt(process.env.MONGODB_SOCKET_TIMEOUT) || 45000,
};

module.exports = config;

