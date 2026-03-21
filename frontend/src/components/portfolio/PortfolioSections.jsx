/**
 * Portfolio Section Components
 * Hero | Skills | Projects | Experience |
 * Certifications | Achievements | CodingProfiles | Contact
 */

import React from "react";

// ── Hero ──────────────────────────────────────────────────────────────────────
export const HeroSection = ({ data }) => {
  const { name, title, about, avatarUrl, socialLinks, contact } = data;
  const socials = [
    { href: socialLinks?.github, label: "GitHub", icon: "⌥" },
    { href: socialLinks?.linkedin, label: "LinkedIn", icon: "in" },
    { href: socialLinks?.twitter, label: "Twitter", icon: "𝕏" },
    { href: socialLinks?.website, label: "Website", icon: "🌐" },
    { href: contact?.email ? `mailto:${contact.email}` : null, label: "Email", icon: "✉" },
  ].filter(s => s.href);

  return (
    <section id="hero" className="hero">
      <div style={{ position: "relative", zIndex: 1 }}>
        {avatarUrl && (
          <img src={avatarUrl} alt={name} className="hero-avatar fade-up"
            onError={e => e.target.style.display = "none"} />
        )}
        <div className="hero-badge fade-up delay-1">
          <span className="dot" /> Open to opportunities
        </div>
        <h1 className="fade-up delay-2">{name || "Your Name"}</h1>
        {title && <p className="hero-title gradient-text fade-up delay-3">{title}</p>}
        <p className="hero-about fade-up delay-4">{about}</p>
        {socials.length > 0 && (
          <div className="hero-socials fade-up delay-5">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">
                <span>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="scroll-hint">↓</div>
    </section>
  );
};

// ── Skills ────────────────────────────────────────────────────────────────────
export const SkillsSection = ({ skills }) => {
  if (!skills?.length) return null;
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>⚡ Tech Stack</div>
          <h2>Skills & <span className="gradient-text">Technologies</span></h2>
          <p>Tools and technologies I work with</p>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => <span key={i} className="tag interactive">{s}</span>)}
        </div>
      </div>
    </section>
  );
};

// ── Projects ──────────────────────────────────────────────────────────────────
export const ProjectsSection = ({ projects }) => {
  if (!projects?.length) return null;
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>📁 Work</div>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p>Things I've built</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="card card-hover project-card">
              <div className="project-card-top">
                <div className="project-icon">📂</div>
                <div className="project-links">
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">Live ↗</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>}
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{p.description}</p>
              {p.techStack?.length > 0 && (
                <div className="project-tech">
                  {p.techStack.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Experience ────────────────────────────────────────────────────────────────
export const ExperienceSection = ({ experience }) => {
  if (!experience?.length) return null;
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>💼 Career</div>
          <h2>Work <span className="gradient-text">Experience</span></h2>
          <p>My professional journey</p>
        </div>
        <div className="timeline">
          {experience.map((e, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-left">
                <div className="timeline-dot" />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-body">
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="timeline-role">{e.role}</span>
                  {e.current && <span className="current-badge">● Current</span>}
                </div>
                <div className="timeline-meta">
                  <span className="timeline-company">{e.company}</span>
                  <span className="timeline-duration">{e.duration}</span>
                </div>
                {e.description && <p className="timeline-desc">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Certifications ────────────────────────────────────────────────────────────
export const CertificationsSection = ({ certifications }) => {
  if (!certifications?.length) return null;
  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>🎓 Learning</div>
          <h2>Certifi<span className="gradient-text">cations</span></h2>
          <p>Courses and credentials I've earned</p>
        </div>
        <div className="certs-grid">
          {certifications.map((c, i) => (
            <div key={i} className="card card-hover cert-card">
              <div className="cert-icon">🏅</div>
              <div>
                <div className="cert-title">{c.title}</div>
                {c.issuer && <div className="cert-issuer">{c.issuer}</div>}
                {c.date && <div className="cert-date">{c.date}</div>}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                    View Credential ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Achievements ──────────────────────────────────────────────────────────────
export const AchievementsSection = ({ achievements }) => {
  if (!achievements?.length) return null;
  return (
    <section id="achievements" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>🏆 Wins</div>
          <h2>Achieve<span className="gradient-text">ments</span></h2>
          <p>Awards, hackathons, and notable milestones</p>
        </div>
        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <div key={i} className="card card-hover achievement-card">
              <div className="achievement-icon">{a.icon || "🏆"}</div>
              <div className="achievement-title">{a.title}</div>
              {a.description && <div className="achievement-desc">{a.description}</div>}
              {a.date && <div className="achievement-date">{a.date}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Coding Profiles ───────────────────────────────────────────────────────────
const PLATFORM_ICONS = {
  leetcode: "🟨", codeforces: "🔵", hackerrank: "🟩", codechef: "🟫",
  github: "⬛", geeksforgeeks: "🟢",
};

export const CodingProfilesSection = ({ codingProfiles }) => {
  if (!codingProfiles?.length) return null;
  return (
    <section id="coding" className="section">
      <div className="container">
        <div className="section-header">
          <div className="badge" style={{ marginBottom: 14 }}>💻 Code</div>
          <h2>Coding <span className="gradient-text">Profiles</span></h2>
          <p>Find me on these platforms</p>
        </div>
        <div className="coding-grid">
          {codingProfiles.map((p, i) => {
            const icon = PLATFORM_ICONS[p.platform?.toLowerCase()] || "💻";
            return (
              <a key={i} href={p.url || "#"} target="_blank" rel="noopener noreferrer"
                className="card card-hover coding-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="coding-platform-icon">{icon}</div>
                <div>
                  <div className="coding-platform">{p.platform}</div>
                  {p.username && <div className="coding-username">@{p.username}</div>}
                  <div className="coding-stats">
                    {p.rating && <span>⭐ {p.rating}</span>}
                    {p.rating && p.solved && <span> · </span>}
                    {p.solved && <span>✅ {p.solved} solved</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Contact ───────────────────────────────────────────────────────────────────
export const ContactSection = ({ contact, socialLinks, name }) => {
  const hasSomething = contact?.email || contact?.phone || Object.values(socialLinks || {}).some(Boolean);
  if (!hasSomething) return null;

  const icons = [
    { href: socialLinks?.github, icon: "⌥", label: "GitHub" },
    { href: socialLinks?.linkedin, icon: "in", label: "LinkedIn" },
    { href: socialLinks?.twitter, icon: "𝕏", label: "Twitter" },
    { href: socialLinks?.website, icon: "🌐", label: "Website" },
  ].filter(s => s.href);

  return (
    <section id="contact" className="contact-section">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="badge" style={{ marginBottom: 20 }}>✉ Get In Touch</div>
        <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 12 }}>
          Let's <span className="gradient-text">Work Together</span>
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
          Open to new opportunities, collaborations, or just a good chat about tech.
        </p>
        <div className="contact-buttons">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="btn btn-primary">✉ {contact.email}</a>
          )}
          {contact?.phone && (
            <a href={`tel:${contact.phone}`} className="btn btn-secondary">📞 {contact.phone}</a>
          )}
        </div>
        {icons.length > 0 && (
          <div className="contact-icons">
            {icons.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="contact-icon" title={s.label}>{s.icon}</a>
            ))}
          </div>
        )}
        <div className="portfolio-footer" style={{ marginTop: 48 }}>
          Portfolio of <strong>{name}</strong> · Built with <span className="gradient-text">PortfolioAI</span>
        </div>
      </div>
    </section>
  );
};
