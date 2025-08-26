const FunChallenge = require("../models/FunChallenge");
const UserPoints = require("../models/UserPoints");

// Complete a fun challenge
const completeFunChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { title, category, impact = {} } = req.body;
    const userId = req.user._id;

    console.log("Completing fun challenge:", {
      challengeId,
      title,
      category,
      userId,
    });

    // Check if challenge already completed
    let funChallenge = await FunChallenge.findOne({
      userId,
      challengeId,
    });

    if (funChallenge && funChallenge.isCompleted) {
      return res.status(400).json({
        success: false,
        error: "Challenge already completed",
      });
    }

    // Create or update fun challenge
    if (!funChallenge) {
      funChallenge = new FunChallenge({
        userId,
        challengeId,
        title,
        category,
        isCompleted: true,
        completedAt: new Date(),
        pointsEarned: 50,
        impact,
      });
    } else {
      funChallenge.isCompleted = true;
      funChallenge.completedAt = new Date();
      funChallenge.impact = impact;
    }

    await funChallenge.save();
    console.log("Fun challenge saved:", funChallenge._id);

    // Update user points
    let userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      userPoints = new UserPoints({ userId });
      console.log("Created new UserPoints for user:", userId);
    }

    userPoints.addPoints(
      50,
      "fun_challenge",
      `Completed fun challenge: ${title}`,
      challengeId
    );

    // Update stats
    userPoints.stats.challengesCompleted += 1;
    if (impact) {
      userPoints.stats.totalImpact.plasticSaved += impact.plasticSaved || 0;
      userPoints.stats.totalImpact.co2Reduced += impact.co2Reduced || 0;
      userPoints.stats.totalImpact.waterSaved += impact.waterSaved || 0;
      userPoints.stats.totalImpact.energySaved += impact.energySaved || 0;
    }

    await userPoints.save();
    console.log("User points updated:", userPoints.totalPoints);

    res.json({
      success: true,
      message: "Fun challenge completed successfully!",
      data: {
        funChallenge,
        pointsEarned: 50,
        totalPoints: userPoints.totalPoints,
        currentLevel: userPoints.currentLevel,
        levelTitle: userPoints.levelTitle,
        streak: userPoints.streak.current,
      },
    });
  } catch (error) {
    console.error("Error completing fun challenge:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      error: "Failed to complete fun challenge",
      details: error.message,
    });
  }
};

// Get user's fun challenges
const getUserFunChallenges = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status = "all" } = req.query;

    console.log("Fetching fun challenges for user:", userId, "status:", status);

    const filter = { userId };
    if (status === "completed") filter.isCompleted = true;
    else if (status === "active") filter.isCompleted = false;

    const funChallenges = await FunChallenge.find(filter).sort({
      completedAt: -1,
      createdAt: -1,
    });

    console.log("Found fun challenges:", funChallenges.length);

    res.json({
      success: true,
      data: { funChallenges },
    });
  } catch (error) {
    console.error("Error fetching user fun challenges:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      error: "Failed to fetch fun challenges",
      details: error.message,
    });
  }
};

// Get fun challenge statistics
const getFunChallengeStats = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Fetching stats for user:", userId);

    // First, let's check if the user has any fun challenges at all
    const totalChallenges = await FunChallenge.countDocuments({ userId });
    console.log("Total fun challenges found for user:", totalChallenges);

    if (totalChallenges === 0) {
      // Return default stats if no challenges exist
      const result = {
        totalCompleted: 0,
        totalPoints: 0,
        categories: [],
        totalImpact: {
          plasticSaved: 0,
          co2Reduced: 0,
          waterSaved: 0,
          energySaved: 0,
        },
      };

      return res.json({
        success: true,
        data: { stats: result },
      });
    }

    // Try aggregation first, fallback to manual calculation if it fails
    let stats;
    try {
      stats = await FunChallenge.aggregate([
        { $match: { userId: userId } },
        {
          $group: {
            _id: null,
            totalCompleted: { $sum: { $cond: ["$isCompleted", 1, 0] } },
            totalPoints: {
              $sum: { $cond: ["$isCompleted", "$pointsEarned", 0] },
            },
            categories: { $addToSet: "$category" },
            totalImpact: {
              plasticSaved: { $sum: { $ifNull: ["$impact.plasticSaved", 0] } },
              co2Reduced: { $sum: { $ifNull: ["$impact.co2Reduced", 0] } },
              waterSaved: { $sum: { $ifNull: ["$impact.waterSaved", 0] } },
              energySaved: { $sum: { $ifNull: ["$impact.energySaved", 0] } },
            },
          },
        },
      ]);
    } catch (aggregateError) {
      console.log(
        "Aggregation failed, using manual calculation:",
        aggregateError.message
      );

      // Fallback to manual calculation
      const allChallenges = await FunChallenge.find({ userId });
      const totalCompleted = allChallenges.filter((c) => c.isCompleted).length;
      const totalPoints = allChallenges
        .filter((c) => c.isCompleted)
        .reduce((sum, c) => sum + (c.pointsEarned || 0), 0);
      const categories = [...new Set(allChallenges.map((c) => c.category))];

      const totalImpact = {
        plasticSaved: allChallenges.reduce(
          (sum, c) => sum + (c.impact?.plasticSaved || 0),
          0
        ),
        co2Reduced: allChallenges.reduce(
          (sum, c) => sum + (c.impact?.co2Reduced || 0),
          0
        ),
        waterSaved: allChallenges.reduce(
          (sum, c) => sum + (c.impact?.waterSaved || 0),
          0
        ),
        energySaved: allChallenges.reduce(
          (sum, c) => sum + (c.impact?.energySaved || 0),
          0
        ),
      };

      stats = [
        {
          totalCompleted,
          totalPoints,
          categories,
          totalImpact,
        },
      ];
    }

    const result = stats[0] || {
      totalCompleted: 0,
      totalPoints: 0,
      categories: [],
      totalImpact: {
        plasticSaved: 0,
        co2Reduced: 0,
        waterSaved: 0,
        energySaved: 0,
      },
    };

    console.log("Stats calculated successfully:", result);

    res.json({
      success: true,
      data: { stats: result },
    });
  } catch (error) {
    console.error("Error fetching fun challenge stats:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      error: "Failed to fetch fun challenge statistics",
      details: error.message,
    });
  }
};

// Reset all fun challenges (for testing purposes)
const resetFunChallenges = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all fun challenges for the user
    await FunChallenge.deleteMany({ userId });

    // Reset user points related to fun challenges
    const userPoints = await UserPoints.findOne({ userId });
    if (userPoints) {
      // Remove fun challenge points from history
      userPoints.history = userPoints.history.filter(
        (entry) => entry.action !== "fun_challenge"
      );

      // Recalculate total points
      userPoints.totalPoints = userPoints.history.reduce(
        (total, entry) => total + entry.points,
        0
      );

      userPoints.calculateLevel();
      await userPoints.save();
    }

    res.json({
      success: true,
      message: "All fun challenges reset successfully",
    });
  } catch (error) {
    console.error("Error resetting fun challenges:", error);
    res.status(500).json({
      success: false,
      error: "Failed to reset fun challenges",
    });
  }
};

module.exports = {
  completeFunChallenge,
  getUserFunChallenges,
  getFunChallengeStats,
  resetFunChallenges,
};
