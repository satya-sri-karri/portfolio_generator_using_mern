/**
 * AI Portfolio Generator — Express Server v2
 * Pure MERN stack: MongoDB + Express + (React frontend) + Node.js
 * Features: Auth (JWT + bcrypt), Portfolio CRUD, Public Share Links
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/portfolio", require("./routes/portfolio"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio API v2 running", time: new Date() });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Connect DB + Start ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio-app")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
