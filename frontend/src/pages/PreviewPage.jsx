/**
 * PreviewPage — Live preview from sessionStorage
 * Opens in new tab when user clicks "Preview" in the builder
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const PreviewPage = () => {
  const { setTheme } = useTheme();
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("preview-data");
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed);
        if (parsed.theme) setTheme(parsed.theme);
      }
    } catch { /* ignore */ }
  }, []); // eslint-disable-line

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 20,
          textAlign: "center",
          padding: 40,
        }}
      >
        <span style={{ fontSize: 48 }}>👁</span>
        <h2 style={{ fontWeight: 900 }}>No preview data found</h2>
        <Link to="/" className="btn btn-primary" style={{ textDecoration: "none" }}>
          Go to Builder
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Preview banner */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background: "var(--accent)",
          color: "#fff",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <span>👁 Preview Mode — This is how your portfolio will look to visitors</span>
        <div style={{ display: "flex", gap: 10 }}>
          <Link
            to="/"
            style={{
              color: "#fff",
              background: "rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 12,
            }}
          >
            ← Back to Builder
          </Link>
          <button
            onClick={() => window.close()}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      <HeroSection data={data} />
      {data.skills?.length > 0 && <SkillsSection skills={data.skills} />}
      {data.projects?.length > 0 && <ProjectsSection projects={data.projects} />}
      {data.experience?.length > 0 && <ExperienceSection experience={data.experience} />}
      {data.certifications?.length > 0 && <CertificationsSection certifications={data.certifications} />}
      {data.achievements?.length > 0 && <AchievementsSection achievements={data.achievements} />}
      {data.codingProfiles?.length > 0 && <CodingProfilesSection codingProfiles={data.codingProfiles} />}
      <ContactSection
        contact={data.contact}
        socialLinks={data.socialLinks}
        name={data.name}
      />
    </div>
  );
};

export default PreviewPage;
