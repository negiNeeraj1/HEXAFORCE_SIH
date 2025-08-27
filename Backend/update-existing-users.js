const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");

// Load environment variables from env.atlas.test file
const envPath = path.join(__dirname, "env.atlas.test");
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
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    };

    await mongoose.connect(mongoUri, connectionOptions);
    console.log("✅ MongoDB connected successfully!");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    return false;
  }
};

// Script to update existing users to add school field
async function updateExistingUsers() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    const connected = await connectDB();

    if (!connected) {
      console.error("Failed to connect to MongoDB. Exiting...");
      process.exit(1);
    }

    // Find all users without school field
    const usersWithoutSchool = await User.find({ school: { $exists: false } });
    console.log(
      `Found ${usersWithoutSchool.length} users without school field`
    );

    if (usersWithoutSchool.length === 0) {
      console.log("All users already have school field");
      return;
    }

    // Update users to add default school field
    const updateResult = await User.updateMany(
      { school: { $exists: false } },
      { $set: { school: "Default Institution" } }
    );

    console.log(
      `Updated ${updateResult.modifiedCount} users with default school`
    );

    // Verify the update
    const updatedUsers = await User.find({ school: { $exists: true } });
    console.log(`Total users with school field: ${updatedUsers.length}`);

    // Show sample updated user
    if (updatedUsers.length > 0) {
      console.log("Sample updated user:", {
        name: updatedUsers[0].name,
        email: updatedUsers[0].email,
        school: updatedUsers[0].school,
      });
    }

    console.log("✅ Update completed successfully!");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed");
    }
    process.exit(0);
  }
}

// Run the update
updateExistingUsers();
