const mongoose = require("mongoose");
const EcoChallenge = require("../models/EcoChallenge");
require("dotenv").config();

const sampleChallenges = [
  {
    title: "Plastic-Free Week",
    description: "Reduce your plastic usage by using reusable containers, bags, and water bottles for an entire week. Track your daily plastic consumption and find alternatives.",
    category: "Waste Reduction",
    difficulty: "Beginner",
    points: 150,
    dailyGoal: 1,
    duration: 7,
    impact: {
      plasticSaved: 0.5,
      co2Reduced: 2.1,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Carry a reusable water bottle",
      "Use cloth shopping bags",
      "Choose products with minimal packaging",
      "Bring your own containers for takeout"
    ],
    tags: ["plastic", "waste", "beginner", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    title: "Energy Conservation Master",
    description: "Learn to reduce your energy consumption through simple daily habits. Turn off lights, unplug devices, and use energy-efficient appliances.",
    category: "Energy Conservation",
    difficulty: "Intermediate",
    points: 300,
    dailyGoal: 3,
    duration: 14,
    impact: {
      plasticSaved: 0,
      co2Reduced: 5.2,
      waterSaved: 0,
      energySaved: 2.5,
    },
    tips: [
      "Turn off lights when leaving rooms",
      "Unplug chargers when not in use",
      "Use natural light during the day",
      "Set thermostat to energy-efficient temperatures"
    ],
    tags: ["energy", "conservation", "intermediate", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400"
  },
  {
    title: "Water Saving Hero",
    description: "Implement water-saving techniques in your daily routine. Fix leaks, take shorter showers, and collect rainwater for plants.",
    category: "Water Conservation",
    difficulty: "Beginner",
    points: 200,
    dailyGoal: 2,
    duration: 10,
    impact: {
      plasticSaved: 0,
      co2Reduced: 1.8,
      waterSaved: 50,
      energySaved: 0,
    },
    tips: [
      "Take 5-minute showers",
      "Fix dripping faucets",
      "Collect rainwater for plants",
      "Use a bucket to wash your car"
    ],
    tags: ["water", "conservation", "beginner", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"
  },
  {
    title: "Plant Care Champion",
    description: "Start growing your own plants and learn sustainable gardening practices. Plant native species, use organic fertilizers, and create a small garden.",
    category: "Plant Care",
    difficulty: "Intermediate",
    points: 250,
    dailyGoal: 1,
    duration: 21,
    impact: {
      plasticSaved: 0.2,
      co2Reduced: 3.5,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Start with easy-to-grow plants",
      "Use organic soil and fertilizers",
      "Water plants in the morning",
      "Choose native plant species"
    ],
    tags: ["plants", "gardening", "intermediate", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
  },
  {
    title: "Sustainable Transportation",
    description: "Reduce your carbon footprint by choosing eco-friendly transportation options. Walk, bike, carpool, or use public transport when possible.",
    category: "Transportation",
    difficulty: "Advanced",
    points: 400,
    dailyGoal: 2,
    duration: 30,
    impact: {
      plasticSaved: 0,
      co2Reduced: 8.5,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Walk or bike for short trips",
      "Use public transportation",
      "Carpool with colleagues",
      "Consider an electric vehicle"
    ],
    tags: ["transportation", "carbon", "advanced", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46102?w=400"
  },
  {
    title: "Zero Waste Kitchen",
    description: "Transform your kitchen into a zero-waste haven. Compost food scraps, buy in bulk, and eliminate single-use items.",
    category: "Waste Reduction",
    difficulty: "Advanced",
    points: 350,
    dailyGoal: 2,
    duration: 21,
    impact: {
      plasticSaved: 1.2,
      co2Reduced: 4.8,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Buy food in bulk",
      "Compost kitchen scraps",
      "Use reusable food storage",
      "Make your own cleaning products"
    ],
    tags: ["kitchen", "zero-waste", "advanced", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
  },
  {
    title: "Eco-Friendly Shopping",
    description: "Make sustainable shopping choices by supporting local businesses, choosing eco-friendly products, and reducing packaging waste.",
    category: "Waste Reduction",
    difficulty: "Beginner",
    points: 180,
    dailyGoal: 1,
    duration: 14,
    impact: {
      plasticSaved: 0.3,
      co2Reduced: 2.5,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Shop at local farmers markets",
      "Choose products with minimal packaging",
      "Bring your own shopping bags",
      "Support eco-friendly brands"
    ],
    tags: ["shopping", "local", "beginner", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
  },
  {
    title: "Climate Education",
    description: "Learn about climate change and sustainability through daily reading, watching documentaries, and sharing knowledge with others.",
    category: "Education",
    difficulty: "Beginner",
    points: 120,
    dailyGoal: 1,
    duration: 7,
    impact: {
      plasticSaved: 0,
      co2Reduced: 0.5,
      waterSaved: 0,
      energySaved: 0,
    },
    tips: [
      "Read climate science articles",
      "Watch environmental documentaries",
      "Join climate discussion groups",
      "Share knowledge with friends and family"
    ],
    tags: ["education", "climate", "beginner", "daily"],
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
  }
];

const createSampleChallenges = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/study-ai";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing challenges
    await EcoChallenge.deleteMany({});
    console.log("🗑️ Cleared existing challenges");

    // Insert sample challenges
    const challenges = await EcoChallenge.insertMany(sampleChallenges);
    console.log(`✅ Created ${challenges.length} sample challenges`);

    // Display created challenges
    challenges.forEach((challenge, index) => {
      console.log(`${index + 1}. ${challenge.title} (${challenge.category})`);
    });

    console.log("\n🎉 Sample challenges created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating sample challenges:", error);
    process.exit(1);
  }
};

// Run the script
createSampleChallenges();
