Write-Host "Starting StudyAI Backend Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Make sure you have:" -ForegroundColor Yellow
Write-Host "1. Node.js installed" -ForegroundColor White
Write-Host "2. MongoDB running or accessible" -ForegroundColor White
Write-Host "3. All dependencies installed (run npm install if needed)" -ForegroundColor White
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the server
npm run dev
