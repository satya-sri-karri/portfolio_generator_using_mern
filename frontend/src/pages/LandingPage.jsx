/**
 * LandingPage
 * Home page for visitors who aren't logged in
 */

import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "👤", title: "Personal Info", desc: "Name, bio, avatar, and professional title" },
  { icon: "⚡", title: "Skills", desc: "Tag-based skill showcase with quick-add suggestions" },
  { icon: "📁", title: "Projects", desc: "Cards with live demo links, GitHub, and tech stack" },
  { icon: "💼", title: "Experience", desc: "Timeline-style work history with current role badge" },
  { icon: "🎓", title: "Certifications", desc: "Courses and credentials with verification links" },
  { icon: "🏆", title: "Achievements", desc: "Awards, hackathons, and notable milestones" },
  { icon: "💻", title: "Coding Profiles", desc: "LeetCode, Codeforces, HackerRank with ratings" },
  { icon: "✉", title: "Contact & Social", desc: "Email, phone, GitHub, LinkedIn, Twitter links" },
];

const LandingPage = () => (
  <div style={{ background: "var(--bg)" }}>
    {/* Hero */}
    <section
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        <div className="badge fade-up" style={{ marginBottom: 24 }}>
          ✨ MERN Stack Project
        </div>

        <h1
          className="fade-up delay-1"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Build a Stunning
          <br />
          <span className="gradient-text">Portfolio Website</span>
          <br />
          in Minutes
        </h1>

        <p
          className="fade-up delay-2"
          style={{
            fontSize: "1.15rem",
            color: "var(--muted)",
            maxWidth: 560,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Fill out a simple form and get a beautiful, shareable portfolio website
          — with skills, projects, certifications, achievements, and coding profiles.
        </p>

        <div
          className="fade-up delay-3"
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            to="/register"
            className="btn btn-primary"
            style={{ fontSize: 16, padding: "14px 32px", textDecoration: "none" }}
          >
            Get Started Free →
          </Link>
          <Link
            to="/login"
            className="btn btn-secondary"
            style={{ fontSize: 16, padding: "14px 28px", textDecoration: "none" }}
          >
            Sign In
          </Link>
        </div>

        <p
          className="fade-up delay-4"
          style={{ color: "var(--muted)", fontSize: 13, marginTop: 20 }}
        >
          No credit card required · Free forever
        </p>
      </div>
    </section>

    {/* Features grid */}
    <section
      style={{
        padding: "80px 24px",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="badge" style={{ marginBottom: 16 }}>📋 Features</div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: 10 }}>
            Everything You Need in{" "}
            <span className="gradient-text">One Place</span>
          </h2>
          <p className="muted">8 sections to showcase every part of your profile</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: "22px 24px", animationDelay: `${i * 0.05}s` }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Tech stack used */}
    <section style={{ padding: "60px 24px", background: "var(--bg)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p
          className="muted"
          style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}
        >
          Built with pure MERN stack
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth", "bcrypt"].map(t => (
            <span
              key={t}
              className="tag"
              style={{ fontSize: 14, padding: "8px 18px", fontWeight: 700 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section
      style={{
        padding: "80px 24px",
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div className="container-sm">
        <h2 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: 14 }}>
          Ready to Stand Out?
        </h2>
        <p className="muted" style={{ fontSize: 16, marginBottom: 32 }}>
          Create your portfolio in minutes and share it with the world
        </p>
        <Link
          to="/register"
          className="btn btn-primary"
          style={{ fontSize: 16, padding: "14px 36px", textDecoration: "none" }}
        >
          Build Your Portfolio →
        </Link>
      </div>
    </section>

    {/* Footer */}
    <footer
      style={{
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid var(--border)",
        color: "var(--muted)",
        fontSize: 13,
      }}
    >
      PortfolioAI — Built with{" "}
      <span className="gradient-text" style={{ fontWeight: 700 }}>
        MongoDB · Express · React · Node.js
      </span>
    </footer>
  </div>
);

export default LandingPage;
