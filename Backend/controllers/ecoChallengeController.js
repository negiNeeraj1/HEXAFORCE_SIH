const EcoChallenge = require("../models/EcoChallenge");
const UserChallenge = require("../models/UserChallenge");
const UserPoints = require("../models/UserPoints");
const User = require("../models/User");

const getAllChallenges = async (req, res) => {
  try {
    const { category, difficulty, status, page = 1, limit = 10 } = req.query;
    
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const challenges = await EcoChallenge.find(filter)
      .sort({ startDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await EcoChallenge.countDocuments(filter);

    res.json({
      success: true,
      data: {
        challenges,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalChallenges: total,
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ success: false, error: "Failed to fetch challenges" });
  }
};

// Get challenge by ID
const getChallengeById = async (req, res) => {
  try {
    const challenge = await EcoChallenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ success: false, error: "Challenge not found" });
    }

    // Get user's participation status if logged in
    let userParticipation = null;
    if (req.user) {
      userParticipation = await UserChallenge.findOne({
        userId: req.user._id,
        challengeId: challenge._id,
      });
    }

    res.json({
      success: true,
      data: {
        challenge,
        userParticipation,
      },
    });
  } catch (error) {
    console.error("Error fetching challenge:", error);
    res.status(500).json({ success: false, error: "Failed to fetch challenge" });
  }
};

// Join a challenge
const joinChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user._id;

    // Check if challenge exists and is active
    const challenge = await EcoChallenge.findById(challengeId);
    if (!challenge || !challenge.isActive) {
      return res.status(400).json({ success: false, error: "Challenge not available" });
    }

    // Check if user already joined
    const existingParticipation = await UserChallenge.findOne({
      userId,
      challengeId,
    });

    if (existingParticipation) {
      return res.status(400).json({ success: false, error: "Already joined this challenge" });
    }

    // Create user challenge participation
    const userChallenge = new UserChallenge({
      userId,
      challengeId,
      startDate: new Date(),
    });

    await userChallenge.save();

    // Initialize user points if not exists
    let userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      userPoints = new UserPoints({ userId });
      await userPoints.save();
    }

    await EcoChallenge.findByIdAndUpdate(challengeId, {
      $inc: { currentParticipants: 1 },
    });

    res.json({
      success: true,
      message: "Successfully joined challenge",
      data: { userChallenge },
    });
  } catch (error) {
    console.error("Error joining challenge:", error);
    res.status(500).json({ success: false, error: "Failed to join challenge" });
  }
};

const completeDailyTask = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { impact } = req.body;
    const userId = req.user._id;

    // Find user's challenge participation
    const userChallenge = await UserChallenge.findOne({
      userId,
      challengeId,
      status: "active",
    });

    if (!userChallenge) {
      return res.status(400).json({ success: false, error: "Challenge not found or not active" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const todayCompletion = userChallenge.progress.dailyCompletions.find(
      (day) => day.date.getTime() === today.getTime()
    );

    if (todayCompletion && todayCompletion.completed) {
      return res.status(400).json({ success: false, error: "Already completed today's task" });
    }

    if (todayCompletion) {
      todayCompletion.completed = true;
      todayCompletion.impact = impact || {};
    } else {
      userChallenge.progress.dailyCompletions.push({
        date: today,
        completed: true,
        impact: impact || {},
      });
    }

    userChallenge.progress.totalCompletions += 1;
    userChallenge.progress.lastCompletionDate = today;
    userChallenge.progress.currentStreak += 1;

    // Calculate points earned
    const challenge = await EcoChallenge.findById(challengeId);
    const pointsEarned = Math.floor(challenge.points / challenge.duration);
    userChallenge.pointsEarned += pointsEarned;

    await userChallenge.save();

    let userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      userPoints = new UserPoints({ userId });
    }

    userPoints.addPoints(
      pointsEarned,
      "daily_challenge",
      `Completed daily task for ${challenge.title}`,
      challengeId
    );

    userPoints.stats.challengesCompleted += 1;
    if (impact) {
      userPoints.stats.totalImpact.plasticSaved += impact.plasticSaved || 0;
      userPoints.stats.totalImpact.co2Reduced += impact.co2Reduced || 0;
      userPoints.stats.totalImpact.waterSaved += impact.waterSaved || 0;
      userPoints.stats.totalImpact.energySaved += impact.energySaved || 0;
    }

    await userPoints.save();

    res.json({
      success: true,
      message: "Daily task completed successfully",
      data: {
        pointsEarned,
        totalPoints: userPoints.totalPoints,
        currentLevel: userPoints.currentLevel,
        levelTitle: userPoints.levelTitle,
        streak: userPoints.streak.current,
      },
    });
  } catch (error) {
    console.error("Error completing daily task:", error);
    res.status(500).json({ success: false, error: "Failed to complete daily task" });
  }
};

// Get user's active challenges
const getUserChallenges = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status = "active" } = req.query;

    const filter = { userId };
    if (status !== "all") filter.status = status;

    const userChallenges = await UserChallenge.find(filter)
      .populate("challengeId")
      .sort({ startDate: -1 });

    res.json({
      success: true,
      data: { userChallenges },
    });
  } catch (error) {
    console.error("Error fetching user challenges:", error);
    res.status(500).json({ success: false, error: "Failed to fetch user challenges" });
  }
};

// Get user's points and achievements
const getUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;

    let userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      userPoints = new UserPoints({ userId });
      await userPoints.save();
    }

    // Calculate medals
    userPoints.calculateMedals();

    res.json({
      success: true,
      data: { userPoints },
    });
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ success: false, error: "Failed to fetch user points" });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const leaderboard = await UserPoints.find()
      .populate("userId", "name email")
      .sort({ totalPoints: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: { leaderboard },
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ success: false, error: "Failed to fetch leaderboard" });
  }
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  joinChallenge,
  completeDailyTask,
  getUserChallenges,
  getUserPoints,
  getLeaderboard,
};
