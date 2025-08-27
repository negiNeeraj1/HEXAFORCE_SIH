require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAPIKey() {
  try {
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      console.log("❌ No API key found!");
      console.log(
        "Please set GEMINI_API_KEY or GOOGLE_AI_API_KEY in your .env file"
      );
      return;
    }

    if (apiKey === "your_actual_gemini_api_key_here") {
      console.log("❌ API key not set properly!");
      console.log(
        "Please replace 'your_actual_gemini_api_key_here' with your real API key"
      );
      return;
    }

    console.log("✅ API key found:", apiKey.substring(0, 10) + "...");

    // Test the API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("🔄 Testing API connection...");
    const result = await model.generateContent(
      "Hello! Please respond with 'API is working!'"
    );
    const response = await result.response;
    const text = response.text();

    console.log("✅ API Response:", text);
    console.log("🎉 Your Google AI API key is working perfectly!");
  } catch (error) {
    console.log("❌ API test failed:", error.message);

    if (error.message.includes("API key")) {
      console.log(
        "💡 Make sure your API key is correct and has proper permissions"
      );
    } else if (error.message.includes("quota")) {
      console.log("💡 Check if you have remaining quota in Google AI Studio");
    }
  }
}

testAPIKey();
