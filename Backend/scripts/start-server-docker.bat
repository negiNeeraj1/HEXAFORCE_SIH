@echo off
echo 🚀 Starting HEXAFORCE Backend with Docker MongoDB...

REM Check if .env.docker exists, if not copy from env.local
if not exist ".env.docker" (
    echo 📋 Creating Docker environment file...
    copy "env.local" ".env.docker"
)

REM Set environment to use Docker MongoDB
set NODE_ENV=development
set MONGODB_URI=mongodb://admin:hexaforce123@localhost:27017/study-ai?authSource=admin

echo 🔌 Using MongoDB: %MONGODB_URI%
echo 🌍 Environment: %NODE_ENV%

REM Start the server
echo 🎯 Starting server...
npm start

pause


