const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

/**
 * ✅ SIGNUP (with subscription details)
 * Registers a new user and activates their subscription.
 */
router.post("/signup", async (req, res) => {
  const { name, email, password, teamName, vehicleType, planType } = req.body;

  try {
    // Check if the user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with extra subscription details
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      teamName,
      vehicleType,
      planType,
      createdAt: new Date(),
    });

    await newUser.save();

    // Auto-login user right after signup
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Signup successful!",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        teamName: newUser.teamName,
        vehicleType: newUser.vehicleType,
        planType: newUser.planType,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});

/**
 * ✅ LOGIN
 * Authenticates existing users and returns a JWT.
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        teamName: user.teamName,
        vehicleType: user.vehicleType,
        planType: user.planType,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

/**
 * ✅ TOKEN VERIFICATION
 * Used to verify and decode token on protected pages (dashboard, telemetry, etc.)
 */
router.get("/verify", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Authorization token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ valid: true, user });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

/**
 * ✅ LOGOUT
 * JWT tokens are stateless — logout simply means deleting the token client-side.
 */
router.post("/logout", (req, res) => {
  res.json({
    message: "Logout successful (client should clear stored token).",
  });
});

module.exports = router;
