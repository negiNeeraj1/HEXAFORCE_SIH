const express = require("express");
const router = express.Router();
const badgeController = require("../controllers/badgeController");
const { auth: authenticateToken } = require("../middleware/authImproved");

// Public routes
router.get("/", badgeController.getAllBadges);
router.get("/category/:category", badgeController.getBadgesByCategory);

// Protected routes
router.get("/user", authenticateToken, badgeController.getUserBadges);
router.get("/progress", authenticateToken, badgeController.getBadgeProgress);

// Admin routes
router.post(
  "/create-defaults",
  authenticateToken,
  badgeController.createDefaultBadges
);

module.exports = router;
