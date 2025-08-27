const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

// Debug endpoint to check authentication
router.get("/auth-test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Authentication is working!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
    timestamp: new Date().toISOString(),
  });
});

// Debug endpoint to check token without auth
router.post("/token-decode", (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    const jwt = require("jsonwebtoken");
    const decoded = jwt.decode(token); // Decode without verification

    res.json({
      success: true,
      tokenInfo: {
        header: decoded ? "Valid JWT format" : "Invalid JWT format",
        payload: decoded,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug endpoint to check environment
router.get("/env-check", (req, res) => {
  res.json({
    success: true,
    environment: {
      JWT_SECRET: process.env.JWT_SECRET ? "SET" : "NOT SET",
      JWT_SECRET_LENGTH: process.env.JWT_SECRET
        ? process.env.JWT_SECRET.length
        : 0,
      NODE_ENV: process.env.NODE_ENV || "not set",
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = router;


