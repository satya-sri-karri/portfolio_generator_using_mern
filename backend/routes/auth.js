/**
 * Auth Routes
 * POST /api/auth/register  → Create account
 * POST /api/auth/login     → Login + get JWT
 * GET  /api/auth/me        → Get current user
 */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Helper: generate JWT
const generateToken = (userId, name) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ── POST /api/auth/register ──────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required." });

    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters." });

    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Email already registered. Please login." });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id, user.name);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed. Try again." });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password." });

    const token = generateToken(user._id, user.name);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed. Try again." });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

module.exports = router;
