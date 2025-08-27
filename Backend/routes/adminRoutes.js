const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middleware/authImproved");
const adminController = require("../controllers/adminController");

// Apply admin authentication to all routes
router.use(requireAdmin);

// Dashboard Routes
router.get("/dashboard/stats", adminController.getDashboardStats);
router.get("/analytics", adminController.getAnalyticsData);

router.get("/system/health", adminController.getSystemHealth);

// User Statistics
router.get("/users/stats", adminController.getUserStats);
router.get("/college/stats", adminController.getCollegeStats);

// User Management
router.get("/users", adminController.listUsers);
router.get("/users/:id", adminController.getUserById);
router.post("/users", adminController.createUser);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
