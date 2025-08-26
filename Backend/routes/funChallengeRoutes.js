const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  completeFunChallenge,
  getUserFunChallenges,
  getFunChallengeStats,
  resetFunChallenges,
} = require("../controllers/funChallengeController");

// All routes require authentication
router.use(auth);

// Fun challenge management
router.post("/challenges/:challengeId/complete", completeFunChallenge);
router.get("/user/challenges", getUserFunChallenges);
router.get("/user/stats", getFunChallengeStats);
router.delete("/user/challenges/reset", resetFunChallenges);

// Test endpoint to verify database connection
router.get("/test", async (req, res) => {
  try {
    const FunChallenge = require("../models/FunChallenge");
    const count = await FunChallenge.countDocuments();
    res.json({
      success: true,
      message: "Database connection successful",
      totalFunChallenges: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Database connection failed",
      details: error.message,
    });
  }
});

module.exports = router;
