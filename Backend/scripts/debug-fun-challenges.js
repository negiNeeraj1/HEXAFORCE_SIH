const mongoose = require("mongoose");
const FunChallenge = require("../models/FunChallenge");
const UserPoints = require("../models/UserPoints");
const User = require("../models/User");

// Test database connection and models
const debugFunChallenges = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/study-ai", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Check if collections exist
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📚 Available collections:",
      collections.map((c) => c.name)
    );

    // Check if FunChallenge collection exists
    const funChallengeExists = collections.some(
      (c) => c.name === "funchallenges"
    );
    console.log("🎯 FunChallenge collection exists:", funChallengeExists);

    // Check if UserPoints collection exists
    const userPointsExists = collections.some((c) => c.name === "userpoints");
    console.log("🏆 UserPoints collection exists:", userPointsExists);

    // Check if User collection exists
    const userExists = collections.some((c) => c.name === "users");
    console.log("👤 User collection exists:", userExists);

    // Test creating a simple document
    if (funChallengeExists) {
      try {
        const testDoc = new FunChallenge({
          userId: new mongoose.Types.ObjectId(),
          challengeId: "test-debug-1",
          title: "Debug Test",
          category: "debug",
          isCompleted: false,
        });

        // Test validation
        const validationError = testDoc.validateSync();
        if (validationError) {
          console.log(
            "❌ FunChallenge validation errors:",
            validationError.errors
          );
        } else {
          console.log("✅ FunChallenge model validation passed");
        }
      } catch (error) {
        console.log("❌ FunChallenge model error:", error.message);
      }
    }

    // Test UserPoints model
    if (userPointsExists) {
      try {
        const testUserPoints = new UserPoints({
          userId: new mongoose.Types.ObjectId(),
          totalPoints: 0,
        });

        const validationError = testUserPoints.validateSync();
        if (validationError) {
          console.log(
            "❌ UserPoints validation errors:",
            validationError.errors
          );
        } else {
          console.log("✅ UserPoints model validation passed");
        }
      } catch (error) {
        console.log("❌ UserPoints model error:", error.message);
      }
    }

    // Test aggregation pipeline
    if (funChallengeExists) {
      try {
        console.log("🧪 Testing aggregation pipeline...");

        const testUserId = new mongoose.Types.ObjectId();
        const testStats = await FunChallenge.aggregate([
          { $match: { userId: testUserId } },
          {
            $group: {
              _id: null,
              totalCompleted: { $sum: { $cond: ["$isCompleted", 1, 0] } },
              totalPoints: {
                $sum: { $cond: ["$isCompleted", "$pointsEarned", 0] },
              },
              categories: { $addToSet: "$category" },
              totalImpact: {
                plasticSaved: {
                  $sum: { $ifNull: ["$impact.plasticSaved", 0] },
                },
                co2Reduced: { $sum: { $ifNull: ["$impact.co2Reduced", 0] } },
                waterSaved: { $sum: { $ifNull: ["$impact.waterSaved", 0] } },
                energySaved: { $sum: { $ifNull: ["$impact.energySaved", 0] } },
              },
            },
          },
        ]);

        console.log("✅ Aggregation pipeline test passed");
        console.log("📊 Test result:", testStats);
      } catch (error) {
        console.log("❌ Aggregation pipeline test failed:", error.message);
        console.log("🔍 Error details:", error);
      }
    }
  } catch (error) {
    console.error("❌ Debug failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run debug
debugFunChallenges();
