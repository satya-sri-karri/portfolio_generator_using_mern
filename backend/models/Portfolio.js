/**
 * Portfolio Model
 * Full schema: personal, skills, projects, experience,
 * certifications, achievements, coding profiles, contact, social
 */

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  link: { type: String, trim: true, default: "" },
  github: { type: String, trim: true, default: "" },
  techStack: [{ type: String, trim: true }],
});

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  current: { type: Boolean, default: false },
});

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  issuer: { type: String, trim: true, default: "" },
  date: { type: String, trim: true, default: "" },
  credentialUrl: { type: String, trim: true, default: "" },
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  date: { type: String, trim: true, default: "" },
  icon: { type: String, default: "trophy" }, // trophy | star | medal | award
});

const CodingProfileSchema = new mongoose.Schema({
  platform: { type: String, trim: true }, // LeetCode, Codeforces, HackerRank, etc.
  username: { type: String, trim: true },
  url: { type: String, trim: true },
  rating: { type: String, trim: true, default: "" },
  solved: { type: String, trim: true, default: "" },
});

const PortfolioSchema = new mongoose.Schema(
  {
    // Owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal
    name: { type: String, required: true, trim: true },
    title: { type: String, trim: true, default: "" },
    about: { type: String, required: true, trim: true },
    avatarUrl: { type: String, trim: true, default: "" },

    // Skills
    skills: [{ type: String, trim: true }],

    // Projects
    projects: [ProjectSchema],

    // Experience
    experience: [ExperienceSchema],

    // New Sections
    certifications: [CertificationSchema],
    achievements: [AchievementSchema],
    codingProfiles: [CodingProfileSchema],

    // Contact
    contact: {
      email: { type: String, trim: true, default: "" },
      phone: { type: String, trim: true, default: "" },
    },

    // Social Links
    socialLinks: {
      github: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      website: { type: String, trim: true, default: "" },
    },

    // Theme
    theme: {
      type: String,
      enum: ["dark", "light", "ocean", "forest"],
      default: "dark",
    },

    // Sharing
    isPublic: { type: Boolean, default: true },
    shareSlug: { type: String, unique: true, sparse: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate share slug from name + timestamp
PortfolioSchema.pre("save", function (next) {
  if (!this.shareSlug) {
    const base = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    this.shareSlug = `${base}-${Date.now().toString(36)}`;
  }
  next();
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
