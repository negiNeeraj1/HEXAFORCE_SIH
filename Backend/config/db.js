const mongoose = require("mongoose");

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
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoUri, connectionOptions);
    console.log("✅ MongoDB connected successfully!");

    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    db.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("🔍 Error details:", err);

    if (process.env.NODE_ENV === "production") {
      console.log("🔄 Retrying connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
