const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EcoChallenge",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
    progress: {
      currentStreak: { type: Number, default: 0 },
      totalCompletions: { type: Number, default: 0 },
      lastCompletionDate: Date,
      dailyCompletions: [{
        date: Date,
        completed: Boolean,
        impact: {
          plasticSaved: { type: Number, default: 0 },
          co2Reduced: { type: Number, default: 0 },
          waterSaved: { type: Number, default: 0 },
          energySaved: { type: Number, default: 0 },
        }
      }]
    },
    pointsEarned: {
      type: Number,
      default: 0,
    },
    achievements: [{
      type: String,
      date: { type: Date, default: Date.now }
    }],
    notes: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique user-challenge combinations
userChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

// Calculate total impact
userChallengeSchema.virtual('totalImpact').get(function() {
  return this.progress.dailyCompletions.reduce((total, day) => {
    if (day.completed && day.impact) {
      total.plasticSaved += day.impact.plasticSaved || 0;
      total.co2Reduced += day.impact.co2Reduced || 0;
      total.waterSaved += day.impact.waterSaved || 0;
      total.energySaved += day.impact.energySaved || 0;
    }
    return total;
  }, { plasticSaved: 0, co2Reduced: 0, waterSaved: 0, energySaved: 0 });
});

module.exports = mongoose.model("UserChallenge", userChallengeSchema);
