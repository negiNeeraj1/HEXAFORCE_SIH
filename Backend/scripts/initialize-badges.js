const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load environment variables from env.atlas.test file
const envPath = path.join(__dirname, "../env.atlas.test");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    if (line.includes("=") && !line.startsWith("#")) {
      const [key, ...valueParts] = line.split("=");
      const value = valueParts.join("=").trim();
      if (key && value) {
        process.env[key] = value;
      }
    }
  });
  console.log("✅ Environment variables loaded from env.atlas.test");
}

// Set default environment variables if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "your_super_secret_jwt_key_for_study_ai_app_2024";
}
if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
  process.env.MONGODB_URI = "mongodb://localhost:27017/study-ai";
}

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/study-ai";

    console.log("🔌 Attempting to connect to MongoDB...");
    console.log(
      "📍 Connection string:",
      mongoUri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")
    );

    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoUri, connectionOptions);
    console.log("✅ MongoDB connected successfully!");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    return false;
  }
};

// Initialize default badges
async function initializeBadges() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    const connected = await connectDB();

    if (!connected) {
      console.error("Failed to connect to MongoDB. Exiting...");
      process.exit(1);
    }

    // Import Badge model
    const Badge = require("../models/Badge");

    // Check if badges already exist
    const existingBadges = await Badge.countDocuments();
    if (existingBadges > 0) {
      console.log(`✅ ${existingBadges} badges already exist in the database`);
      return;
    }

    console.log("Creating default badges...");

    const defaultBadges = [
      // Quiz Badges
      {
        name: "Quiz Beginner",
        description: "Complete your first quiz",
        category: "quiz",
        icon: "📝",
        color: "#10B981",
        requirements: { type: "count", value: 1 },
        pointsReward: 10,
        rarity: "common",
        order: 1,
      },
      {
        name: "Quiz Master",
        description: "Complete 10 quizzes",
        category: "quiz",
        icon: "🏆",
        color: "#F59E0B",
        requirements: { type: "count", value: 10 },
        pointsReward: 50,
        rarity: "rare",
        order: 2,
      },
      {
        name: "Quiz Champion",
        description: "Complete 50 quizzes",
        category: "quiz",
        icon: "👑",
        color: "#8B5CF6",
        requirements: { type: "count", value: 50 },
        pointsReward: 100,
        rarity: "epic",
        order: 3,
      },
      {
        name: "Perfect Score",
        description: "Get 100% on any quiz",
        category: "quiz",
        icon: "⭐",
        color: "#EF4444",
        requirements: { type: "score", value: 100 },
        pointsReward: 25,
        rarity: "rare",
        order: 4,
      },
      {
        name: "Advanced Learner",
        description: "Complete 5 advanced level quizzes",
        category: "quiz",
        icon: "🚀",
        color: "#7C3AED",
        requirements: { type: "count", value: 5, difficulty: "advanced" },
        pointsReward: 75,
        rarity: "epic",
        order: 5,
      },
      
      // Streak Badges
      {
        name: "Week Warrior",
        description: "Maintain a 7-day learning streak",
        category: "streak",
        icon: "🔥",
        color: "#F97316",
        requirements: { type: "streak", value: 7 },
        pointsReward: 30,
        rarity: "rare",
        order: 6,
      },
      {
        name: "Month Master",
        description: "Maintain a 30-day learning streak",
        category: "streak",
        icon: "💪",
        color: "#DC2626",
        requirements: { type: "streak", value: 30 },
        pointsReward: 100,
        rarity: "legendary",
        order: 7,
      },
      
      // Points Badges
      {
        name: "Bronze Achiever",
        description: "Earn 100 points",
        category: "achievement",
        icon: "🥉",
        color: "#CD7F32",
        requirements: { type: "points", value: 100 },
        pointsReward: 0,
        rarity: "common",
        order: 8,
      },
      {
        name: "Silver Star",
        description: "Earn 500 points",
        category: "achievement",
        icon: "🥈",
        color: "#C0C0C0",
        requirements: { type: "points", value: 500 },
        pointsReward: 0,
        rarity: "rare",
        order: 9,
      },
      {
        name: "Gold Elite",
        description: "Earn 1000 points",
        category: "achievement",
        icon: "🥇",
        color: "#FFD700",
        requirements: { type: "points", value: 1000 },
        pointsReward: 0,
        rarity: "epic",
        order: 10,
      },
      {
        name: "Platinum Master",
        description: "Earn 5000 points",
        category: "achievement",
        icon: "💎",
        color: "#E5E4E2",
        requirements: { type: "points", value: 5000 },
        pointsReward: 0,
        rarity: "legendary",
        order: 11,
      },
      
      // Challenge Badges
      {
        name: "Challenge Starter",
        description: "Complete your first eco challenge",
        category: "challenge",
        icon: "🌱",
        color: "#059669",
        requirements: { type: "count", value: 1 },
        pointsReward: 20,
        rarity: "common",
        order: 12,
      },
      {
        name: "Challenge Champion",
        description: "Complete 25 challenges",
        category: "challenge",
        icon: "🌍",
        color: "#0EA5E9",
        requirements: { type: "count", value: 25 },
        pointsReward: 100,
        rarity: "epic",
        order: 13,
      },
      
      // Subject-specific badges
      {
        name: "Climate Expert",
        description: "Complete 5 quizzes on Climate Change & Global Warming",
        category: "quiz",
        icon: "🌡️",
        color: "#DC2626",
        requirements: { type: "count", value: 5, subject: "Climate Change & Global Warming" },
        pointsReward: 50,
        rarity: "rare",
        order: 14,
      },
      {
        name: "Biodiversity Guardian",
        description: "Complete 5 quizzes on Biodiversity & Ecosystems",
        category: "quiz",
        icon: "🦋",
        color: "#059669",
        requirements: { type: "count", value: 5, subject: "Biodiversity & Ecosystems" },
        pointsReward: 50,
        rarity: "rare",
        order: 15,
      },
      {
        name: "Energy Innovator",
        description: "Complete 5 quizzes on Renewable Energy Sources",
        category: "quiz",
        icon: "⚡",
        color: "#F59E0B",
        requirements: { type: "count", value: 5, subject: "Renewable Energy Sources" },
        pointsReward: 50,
        rarity: "rare",
        order: 16,
      },
      
      // Special badges
      {
        name: "Speed Demon",
        description: "Complete a quiz in under 2 minutes",
        category: "special",
        icon: "⚡",
        color: "#7C3AED",
        requirements: { type: "combination", value: { timeTaken: 2 } },
        pointsReward: 25,
        rarity: "rare",
        order: 17,
      },
      {
        name: "Consistency King",
        description: "Complete quizzes on 5 different subjects",
        category: "special",
        icon: "👑",
        color: "#DC2626",
        requirements: { type: "combination", value: { subjects: 5 } },
        pointsReward: 75,
        rarity: "epic",
        order: 18,
      },
    ];

    // Create badges
    const createdBadges = await Badge.insertMany(defaultBadges);
    
    console.log(`✅ Successfully created ${createdBadges.length} default badges!`);
    
    // Display created badges
    console.log("\n📋 Created Badges:");
    createdBadges.forEach((badge, index) => {
      console.log(`${index + 1}. ${badge.icon} ${badge.name} (${badge.rarity})`);
    });

  } catch (error) {
    console.error("❌ Error initializing badges:", error);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed");
    }
    process.exit(0);
  }
}

// Run the initialization
initializeBadges();
