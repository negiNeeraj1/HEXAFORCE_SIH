const express = require("express");
const router = express.Router();
const { auth, userRateLimit } = require("../middleware/authImproved");
const {
  getAllChallenges,
  getChallengeById,
  joinChallenge,
  completeDailyTask,
  getUserChallenges,
  getUserPoints,
  getLeaderboard,
} = require("../controllers/ecoChallengeController");

// Public routes (no authentication required)
router.get("/challenges", getAllChallenges);
router.get("/challenges/:id", getChallengeById);
router.get("/leaderboard", getLeaderboard);

// Protected routes (authentication required)
router.use(auth);

// Apply rate limiting to user actions
router.use(userRateLimit(30, 15 * 60 * 1000)); // 30 requests per 15 minutes

// User challenge management
router.post("/challenges/:challengeId/join", joinChallenge);
router.post("/challenges/:challengeId/complete", completeDailyTask);
router.get("/user/challenges", getUserChallenges);
router.get("/user/points", getUserPoints);

module.exports = router;
