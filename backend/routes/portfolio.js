/**
 * Portfolio Routes
 * POST   /api/portfolio            → Create portfolio (auth required)
 * GET    /api/portfolio/my         → Get logged-in user's portfolios
 * GET    /api/portfolio/:id        → Get by MongoDB ID (auth required)
 * PUT    /api/portfolio/:id        → Update portfolio (auth required)
 * DELETE /api/portfolio/:id        → Delete portfolio (auth required)
 * GET    /api/portfolio/share/:slug → Public share link (no auth)
 */

const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const authMiddleware = require("../middleware/auth");

// ── POST /api/portfolio ──────────────────────────────────────────────────────
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = { ...req.body, userId: req.userId };

    if (!data.name || !data.about)
      return res.status(400).json({ error: "Name and About are required." });

    const portfolio = await Portfolio.create(data);

    res.status(201).json({
      success: true,
      message: "Portfolio created!",
      data: {
        id: portfolio._id,
        shareSlug: portfolio.shareSlug,
        shareUrl: `/portfolio/share/${portfolio.shareSlug}`,
      },
    });
  } catch (err) {
    console.error("Create portfolio error:", err);
    if (err.name === "ValidationError") {
      const msgs = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: msgs.join(", ") });
    }
    res.status(500).json({ error: "Failed to create portfolio." });
  }
});

// ── GET /api/portfolio/my ────────────────────────────────────────────────────
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId })
      .select("name title theme shareSlug createdAt views isPublic")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: portfolios });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolios." });
  }
});

// ── GET /api/portfolio/share/:slug ───────────────────────────────────────────
// PUBLIC — no auth required. This is the shareable link endpoint.
router.get("/share/:slug", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      shareSlug: req.params.slug,
      isPublic: true,
    });

    if (!portfolio)
      return res.status(404).json({ error: "Portfolio not found or is private." });

    // Increment view count
    portfolio.views += 1;
    await portfolio.save();

    res.json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio." });
  }
});

// ── GET /api/portfolio/:id ───────────────────────────────────────────────────
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!portfolio)
      return res.status(404).json({ error: "Portfolio not found." });

    res.json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio." });
  }
});

// ── PUT /api/portfolio/:id ───────────────────────────────────────────────────
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData.userId;
    delete updateData.shareSlug;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!portfolio)
      return res.status(404).json({ error: "Portfolio not found." });

    res.json({ success: true, message: "Portfolio updated!", data: portfolio });
  } catch (err) {
    res.status(500).json({ error: "Failed to update portfolio." });
  }
});

// ── DELETE /api/portfolio/:id ────────────────────────────────────────────────
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!portfolio)
      return res.status(404).json({ error: "Portfolio not found." });

    res.json({ success: true, message: "Portfolio deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete portfolio." });
  }
});

module.exports = router;
