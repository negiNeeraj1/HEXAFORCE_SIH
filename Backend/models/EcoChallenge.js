const mongoose = require("mongoose");

const ecoChallengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Waste Reduction",
        "Energy Conservation",
        "Water Conservation",
        "Transportation",
        "Food & Diet",
        "Recycling",
        "Plant Care",
        "Education"
      ],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    points: {
      type: Number,
      required: true,
      min: 10,
      max: 500,
    },
    dailyGoal: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    duration: {
      type: Number,
      default: 7, // days
      min: 1,
      max: 30,
    },
    impact: {
      plasticSaved: { type: Number, default: 0 }, // kg
      co2Reduced: { type: Number, default: 0 }, // kg CO2
      waterSaved: { type: Number, default: 0 }, // liters
      energySaved: { type: Number, default: 0 }, // kWh
    },
    tips: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    maxParticipants: {
      type: Number,
      default: 1000,
    },
    currentParticipants: {
      type: Number,
      default: 0,
    },
    tags: [String],
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

// Calculate end date based on duration
ecoChallengeSchema.pre("save", function (next) {
  if (this.duration && !this.endDate) {
    this.endDate = new Date(this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model("EcoChallenge", ecoChallengeSchema);
