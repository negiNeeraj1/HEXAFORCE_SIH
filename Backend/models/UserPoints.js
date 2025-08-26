const mongoose = require("mongoose");

const userPointsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentLevel: {
      type: Number,
      default: 1,
      min: 1,
    },
    levelTitle: {
      type: String,
      default: "Eco-Beginner",
    },
    pointsToNextLevel: {
      type: Number,
      default: 100,
    },
    achievements: [{
      id: String,
      name: String,
      description: String,
      icon: String,
      dateEarned: { type: Date, default: Date.now },
      points: Number,
    }],
    badges: [{
      id: String,
      name: String,
      description: String,
      icon: String,
      dateEarned: { type: Date, default: Date.now },
      category: String,
    }],
    medals: {
      bronze: { type: Number, default: 0 },
      silver: { type: Number, default: 0 },
      gold: { type: Number, default: 0 },
      platinum: { type: Number, default: 0 },
    },
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActivityDate: Date,
    },
    stats: {
      challengesCompleted: { type: Number, default: 0 },
      totalImpact: {
        plasticSaved: { type: Number, default: 0 },
        co2Reduced: { type: Number, default: 0 },
        waterSaved: { type: Number, default: 0 },
        energySaved: { type: Number, default: 0 },
      },
      daysActive: { type: Number, default: 0 },
      perfectWeeks: { type: Number, default: 0 },
    },
    history: [{
      action: String,
      points: Number,
      challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "EcoChallenge" },
      date: { type: Date, default: Date.now },
      description: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Calculate level and title based on points
userPointsSchema.methods.calculateLevel = function() {
  const points = this.totalPoints;
  let level = 1;
  let title = "Eco-Beginner";
  let pointsToNext = 100;

  if (points >= 1000) {
    level = Math.floor(points / 1000) + 1;
    if (level >= 10) title = "Eco-Master";
    else if (level >= 7) title = "Eco-Expert";
    else if (level >= 5) title = "Eco-Professional";
    else if (level >= 3) title = "Eco-Enthusiast";
    else title = "Eco-Learner";
    pointsToNext = (level * 1000) - points;
  }

  this.currentLevel = level;
  this.levelTitle = title;
  this.pointsToNextLevel = pointsToNext;
  return { level, title, pointsToNext };
};

// Add points and update level
userPointsSchema.methods.addPoints = function(points, action, description, challengeId) {
  this.totalPoints += points;
  this.calculateLevel();
  
  // Add to history
  this.history.push({
    action,
    points,
    challengeId,
    description,
    date: new Date()
  });

  // Update streak
  const today = new Date();
  const lastActivity = this.streak.lastActivityDate;
  
  if (!lastActivity || this.isConsecutiveDay(lastActivity, today)) {
    this.streak.current += 1;
    if (this.streak.current > this.streak.longest) {
      this.streak.longest = this.streak.current;
    }
  } else {
    this.streak.current = 1;
  }
  
  this.streak.lastActivityDate = today;
  
  return this;
};

// Check if two dates are consecutive
userPointsSchema.methods.isConsecutiveDay = function(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / oneDay);
  return diffDays <= 1;
};

// Calculate medals based on achievements
userPointsSchema.methods.calculateMedals = function() {
  const totalAchievements = this.achievements.length;
  
  if (totalAchievements >= 50) this.medals.platinum = Math.floor(totalAchievements / 50);
  if (totalAchievements >= 25) this.medals.gold = Math.floor(totalAchievements / 25);
  if (totalAchievements >= 10) this.medals.silver = Math.floor(totalAchievements / 10);
  if (totalAchievements >= 5) this.medals.bronze = Math.floor(totalAchievements / 5);
  
  return this.medals;
};

module.exports = mongoose.model("UserPoints", userPointsSchema);
