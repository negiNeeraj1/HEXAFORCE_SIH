const mongoose = require("mongoose");
const FunChallenge = require("../models/FunChallenge");
const UserPoints = require("../models/UserPoints");
const User = require("../models/User");

// Test database connection
const testConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/study-ai", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Test creating a fun challenge
const testCreateFunChallenge = async () => {
  try {
    // Create a test user first
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword123",
    });
    await testUser.save();
    console.log("✅ Test user created:", testUser._id);

    // Create a fun challenge
    const funChallenge = new FunChallenge({
      userId: testUser._id,
      challengeId: "test-challenge-1",
      title: "Test Challenge",
      category: "test",
      isCompleted: true,
      completedAt: new Date(),
      pointsEarned: 50,
    });
    await funChallenge.save();
    console.log("✅ Fun challenge created:", funChallenge._id);

    // Create user points
    const userPoints = new UserPoints({
      userId: testUser._id,
      totalPoints: 50,
    });
    await userPoints.save();
    console.log("✅ User points created:", userPoints._id);

    // Test querying
    const completedChallenges = await FunChallenge.find({
      userId: testUser._id,
    });
    console.log("✅ Found completed challenges:", completedChallenges.length);

    const userPointsData = await UserPoints.findOne({ userId: testUser._id });
    console.log("✅ User points data:", userPointsData.totalPoints);

    // Cleanup
    await FunChallenge.deleteMany({ userId: testUser._id });
    await UserPoints.deleteMany({ userId: testUser._id });
    await User.deleteMany({ _id: testUser._id });
    console.log("✅ Test data cleaned up");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Run tests
const runTests = async () => {
  await testConnection();
  await testCreateFunChallenge();

  console.log("🎉 All tests completed!");
  process.exit(0);
};

runTests();
