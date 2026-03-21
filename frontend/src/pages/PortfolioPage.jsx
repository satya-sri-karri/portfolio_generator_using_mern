/**
 * PortfolioPage — Public View
 * Fetched via share slug: GET /api/portfolio/share/:slug
 * No auth required. Shows all sections + share button.
 */

import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicPortfolio } from "../utils/api";
import { useTheme } from "../context/ThemeContext";
import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  CertificationsSection,
  AchievementsSection,
  CodingProfilesSection,
  ContactSection,
} from "../components/portfolio/PortfolioSections";

// Sticky portfolio nav with active section tracking
const PortfolioNav = ({ name, sections }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Find which section is currently visible
      for (const sec of sections.slice().reverse()) {
        const el = document.getElementById(sec.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav className={`portfolio-nav ${scrolled ? "scrolled" : ""}`}>
      <span style={{ fontWeight: 900, fontSize: 17 }}>{name}</span>
      <div className="pnav-links">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? "active" : ""}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

// Floating share bar
const ShareBar = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/p/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: "My Portfolio", url: shareUrl });
    } else {
      handleCopy();
    }
  };

  return (
    <>
      {copied && (
        <div className="share-toast">✓ Link copied to clipboard!</div>
      )}
      <div className="share-bar">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleNativeShare}
          style={{ boxShadow: "0 4px 20px var(--accent-glow)" }}
        >
          📤 Share
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleCopy}
          title="Copy link"
        >
          {copied ? "✓" : "🔗"}
        </button>
        <Link
          to="/"
          className="btn btn-ghost btn-sm"
          title="Build your own"
          style={{ textDecoration: "none" }}
        >
          ✨
        </Link>
      </div>
    </>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const PortfolioPage = () => {
  const { slug } = useParams();
  const { setTheme } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPublicPortfolio(slug);
        setData(res.data);
        if (res.data.theme) setTheme(res.data.theme);
      } catch (err) {
        setError(err.message || "Portfolio not found.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]); // eslint-disable-line

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
        <p className="muted">Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
          padding: 40,
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 64 }}>🔍</span>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>Portfolio Not Found</h1>
        <p className="muted">{error}</p>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: "none" }}>
          Build Your Own Portfolio
        </Link>
      </div>
    );
  }

  // Build visible sections list for nav
  const sections = [
    { id: "hero", label: "Home" },
    data.skills?.length && { id: "skills", label: "Skills" },
    data.projects?.length && { id: "projects", label: "Projects" },
    data.experience?.length && { id: "experience", label: "Experience" },
    data.certifications?.length && { id: "certifications", label: "Certs" },
    data.achievements?.length && { id: "achievements", label: "Wins" },
    data.codingProfiles?.length && { id: "coding", label: "Coding" },
    { id: "contact", label: "Contact" },
  ].filter(Boolean);

  return (
    <div style={{ background: "var(--bg)" }}>
      <PortfolioNav name={data.name} sections={sections} />

      <HeroSection data={data} />

      {data.skills?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <SkillsSection skills={data.skills} />
        </>
      )}

      {data.projects?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <ProjectsSection projects={data.projects} />
        </>
      )}

      {data.experience?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <ExperienceSection experience={data.experience} />
        </>
      )}

      {data.certifications?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <CertificationsSection certifications={data.certifications} />
        </>
      )}

      {data.achievements?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <AchievementsSection achievements={data.achievements} />
        </>
      )}

      {data.codingProfiles?.length > 0 && (
        <>
          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
          <CodingProfilesSection codingProfiles={data.codingProfiles} />
        </>
      )}

      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border),transparent)" }} />
      <ContactSection
        contact={data.contact}
        socialLinks={data.socialLinks}
        name={data.name}
      />

      {/* Floating share + build-yours buttons */}
      <ShareBar slug={slug} />
    </div>
  );
};

export default PortfolioPage;
