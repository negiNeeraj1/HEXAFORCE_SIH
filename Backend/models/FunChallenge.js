const mongoose = require("mongoose");

const funChallengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    pointsEarned: {
      type: Number,
      default: 50,
    },
    impact: {
      plasticSaved: { type: Number, default: 0 },
      co2Reduced: { type: Number, default: 0 },
      waterSaved: { type: Number, default: 0 },
      energySaved: { type: Number, default: 0 },
    },
    notes: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique user-challenge combinations
funChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

module.exports = mongoose.model("FunChallenge", funChallengeSchema);
