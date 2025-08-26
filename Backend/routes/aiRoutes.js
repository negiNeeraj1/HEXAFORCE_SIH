const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

// Test endpoint to check if the route is working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI routes are working!",
    status: "Dependencies not installed yet",
    nextSteps: [
      "npm install @google-cloud/vision multer",
      "Add GOOGLE_VISION_API_KEY to .env file",
      "Restart the server",
    ],
  });
});

// Temporary placeholder endpoint when dependencies are not available
router.post("/analyze-image", auth, (req, res) => {
  res.json({
    success: false,
    message:
      "Image analysis not available yet - dependencies need to be installed",
    dependencies: {
      multer: false,
      visionClient: false,
      googleVisionApiKey: !!process.env.GOOGLE_VISION_API_KEY,
      googleCredentials: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
    nextSteps: [
      "npm install @google-cloud/vision multer",
      "Add GOOGLE_VISION_API_KEY to .env file",
      "Restart the server",
    ],
  });
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "AI routes are healthy",
    timestamp: new Date().toISOString(),
    status: "Dependencies not installed",
  });
});

module.exports = router;
