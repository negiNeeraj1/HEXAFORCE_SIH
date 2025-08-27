const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["quiz", "challenge", "streak", "achievement", "special"],
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    requirements: {
      type: {
        type: String,
        required: true,
        enum: ["points", "count", "streak", "score", "combination"],
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
      subject: String, // For subject-specific badges
      difficulty: String, // For difficulty-specific badges
    },
    pointsReward: {
      type: Number,
      default: 0,
    },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
badgeSchema.index({ category: 1, order: 1 });
badgeSchema.index({ "requirements.type": 1 });

// Static method to get badges by category
badgeSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ order: 1 });
};

// Static method to get badges by requirements type
badgeSchema.statics.getByRequirementType = function(type) {
  return this.find({ "requirements.type": type, isActive: true }).sort({ order: 1 });
};

// Instance method to check if user qualifies for this badge
badgeSchema.methods.checkEligibility = function(userStats) {
  const { requirements } = this;
  
  switch (requirements.type) {
    case "points":
      return userStats.totalPoints >= requirements.value;
    
    case "count":
      if (requirements.subject) {
        return userStats.subjectAttempts?.[requirements.subject] >= requirements.value;
      }
      if (requirements.difficulty) {
        return userStats.difficultyAttempts?.[requirements.difficulty] >= requirements.value;
      }
      return userStats.totalAttempts >= requirements.value;
    
    case "streak":
      return userStats.currentStreak >= requirements.value;
    
    case "score":
      return userStats.averageScore >= requirements.value;
    
    case "combination":
      // Handle complex requirements
      return this.checkCombinationRequirements(userStats, requirements.value);
    
    default:
      return false;
  }
};

// Helper method for combination requirements
badgeSchema.methods.checkCombinationRequirements = function(userStats, requirements) {
  // Example: { points: 1000, streak: 7, score: 80 }
  for (const [key, value] of Object.entries(requirements)) {
    if (key === "points" && userStats.totalPoints < value) return false;
    if (key === "streak" && userStats.currentStreak < value) return false;
    if (key === "score" && userStats.averageScore < value) return false;
    if (key === "attempts" && userStats.totalAttempts < value) return false;
  }
  return true;
};

module.exports = mongoose.model("Badge", badgeSchema);
