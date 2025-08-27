const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, school, email, password } = req.body;
    if (!name || !school || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use." });
    }
    const user = await User.create({ name, school, email, password });
    const token = createToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        school: user.school,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const token = createToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        school: user.school,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
};

// Get current user data
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    console.log("GetMe response user data:", user); // Debug log
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        school: user.school,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("GetMe error:", err);
    res.status(500).json({ error: "Failed to get user data." });
  }
};
