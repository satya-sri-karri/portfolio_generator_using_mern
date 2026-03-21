/**
 * All Form Step Components
 * Steps: Personal | Skills | Projects | Experience |
 *        Certifications | Achievements | CodingProfiles | Contact | Theme
 */

import React from "react";
import { useTheme, THEMES } from "../../context/ThemeContext";

// ── STEP 1: Personal Info ─────────────────────────────────────────────────────
export const PersonalStep = ({ form, set }) => (
  <div>
    <div className="section-title">Personal Info</div>
    <div className="section-sub">Tell the world who you are</div>

    <div className="form-group">
      <label className="form-label">Full Name *</label>
      <input className="form-input" placeholder="John Doe" value={form.name}
        onChange={e => set("name", e.target.value)} />
    </div>
    <div className="form-group">
      <label className="form-label">Professional Title</label>
      <input className="form-input" placeholder="Full Stack Developer · ML Engineer"
        value={form.title} onChange={e => set("title", e.target.value)} />
    </div>
    <div className="form-group">
      <label className="form-label">About Me *</label>
      <textarea className="form-input" rows={5}
        placeholder="Write a compelling bio. What drives you? What are you building?"
        value={form.about} onChange={e => set("about", e.target.value)} />
      <span className="form-hint">{form.about.length}/2000</span>
    </div>
    <div className="form-group">
      <label className="form-label">Avatar URL (optional)</label>
      <input className="form-input" type="url"
        placeholder="https://github.com/username.png"
        value={form.avatarUrl} onChange={e => set("avatarUrl", e.target.value)} />
      {form.avatarUrl && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
          <img src={form.avatarUrl} alt="preview" onError={e => e.target.style.display = "none"}
            style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid var(--accent)", objectFit: "cover" }} />
          <span className="form-hint">Preview</span>
        </div>
      )}
    </div>
  </div>
);

// ── STEP 2: Skills ────────────────────────────────────────────────────────────
const SUGGESTED = ["JavaScript","TypeScript","React","Node.js","Python","MongoDB","Express","PostgreSQL","Docker","AWS","Git","REST APIs","GraphQL","Next.js","Redux"];

export const SkillsStep = ({ form, skillInput, setSkillInput, addSkill, addSkillDirect, removeSkill }) => {
  const handleKey = e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); } };
  return (
    <div>
      <div className="section-title">Skills & Technologies</div>
      <div className="section-sub">Press Enter or comma to add each skill</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input className="form-input" placeholder="e.g. React, Node.js..."
          value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleKey}
          style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={addSkill} type="button">+ Add</button>
      </div>

      {form.skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {form.skills.map((s, i) => (
            <span key={i} className="tag">
              {s}
              <span className="tag-remove" onClick={() => removeSkill(i)}>×</span>
            </span>
          ))}
        </div>
      )}

      <div className="form-label" style={{ marginBottom: 10 }}>⚡ Quick Add</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SUGGESTED.filter(s => !form.skills.map(x => x.toLowerCase()).includes(s.toLowerCase())).map(s => (
          <button key={s} type="button" className="btn btn-ghost btn-sm"
            onClick={() => addSkillDirect(s)}>
            + {s}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── STEP 3: Projects ──────────────────────────────────────────────────────────
export const ProjectsStep = ({ form, addItem, updateItem, removeItem }) => (
  <div>
    <div className="section-title">Projects</div>
    <div className="section-sub">Showcase your best work (up to 8)</div>

    {form.projects.map((p, i) => (
      <div key={i} className="sub-card">
        <div className="sub-card-header">
          <span className="sub-card-title">Project {i + 1}</span>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem("projects", i)}>Remove</button>
        </div>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" placeholder="E-Commerce Platform"
            value={p.title} onChange={e => updateItem("projects", i, "title", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} placeholder="What does it do? What problem does it solve?"
            value={p.description} onChange={e => updateItem("projects", i, "description", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Live URL</label>
            <input className="form-input" type="url" placeholder="https://myapp.com"
              value={p.link} onChange={e => updateItem("projects", i, "link", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">GitHub URL</label>
            <input className="form-input" type="url" placeholder="https://github.com/..."
              value={p.github} onChange={e => updateItem("projects", i, "github", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tech Stack (comma separated)</label>
          <input className="form-input" placeholder="React, Node.js, MongoDB"
            value={p.techStack?.join(", ") || ""}
            onChange={e => updateItem("projects", i, "techStack",
              e.target.value.split(",").map(t => t.trim()).filter(Boolean))} />
        </div>
      </div>
    ))}
    {form.projects.length < 8 && (
      <button type="button" className="add-row-btn"
        onClick={() => addItem("projects", { title: "", description: "", link: "", github: "", techStack: [] })}>
        + Add Project
      </button>
    )}
  </div>
);

// ── STEP 4: Experience ────────────────────────────────────────────────────────
export const ExperienceStep = ({ form, addItem, updateItem, removeItem }) => (
  <div>
    <div className="section-title">Work Experience</div>
    <div className="section-sub">Your professional journey</div>

    {form.experience.map((e, i) => (
      <div key={i} className="sub-card">
        <div className="sub-card-header">
          <span className="sub-card-title">Position {i + 1}</span>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem("experience", i)}>Remove</button>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input className="form-input" placeholder="Senior Developer"
              value={e.role} onChange={ev => updateItem("experience", i, "role", ev.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Company *</label>
            <input className="form-input" placeholder="Google"
              value={e.company} onChange={ev => updateItem("experience", i, "company", ev.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Duration *</label>
          <input className="form-input" placeholder="Jan 2022 – Present"
            value={e.duration} onChange={ev => updateItem("experience", i, "duration", ev.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} placeholder="Key achievements and responsibilities..."
            value={e.description} onChange={ev => updateItem("experience", i, "description", ev.target.value)} />
        </div>
        <div className="toggle-row" onClick={() => updateItem("experience", i, "current", !e.current)}>
          <div className={`toggle-track ${e.current ? "on" : ""}`}><div className="toggle-thumb" /></div>
          <span className="toggle-label">Current role</span>
        </div>
      </div>
    ))}
    <button type="button" className="add-row-btn"
      onClick={() => addItem("experience", { role: "", company: "", duration: "", description: "", current: false })}>
      + Add Experience
    </button>
  </div>
);

// ── STEP 5: Certifications ────────────────────────────────────────────────────
export const CertificationsStep = ({ form, addItem, updateItem, removeItem }) => (
  <div>
    <div className="section-title">Certifications</div>
    <div className="section-sub">Courses, licenses, and credentials you've earned</div>

    {form.certifications.map((c, i) => (
      <div key={i} className="sub-card">
        <div className="sub-card-header">
          <span className="sub-card-title">Certification {i + 1}</span>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem("certifications", i)}>Remove</button>
        </div>
        <div className="form-group">
          <label className="form-label">Certificate Title *</label>
          <input className="form-input" placeholder="AWS Solutions Architect"
            value={c.title} onChange={e => updateItem("certifications", i, "title", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Issuing Organization</label>
            <input className="form-input" placeholder="Amazon Web Services"
              value={c.issuer} onChange={e => updateItem("certifications", i, "issuer", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" placeholder="Dec 2023"
              value={c.date} onChange={e => updateItem("certifications", i, "date", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Credential URL</label>
          <input className="form-input" type="url" placeholder="https://credly.com/badges/..."
            value={c.credentialUrl} onChange={e => updateItem("certifications", i, "credentialUrl", e.target.value)} />
        </div>
      </div>
    ))}
    <button type="button" className="add-row-btn"
      onClick={() => addItem("certifications", { title: "", issuer: "", date: "", credentialUrl: "" })}>
      + Add Certification
    </button>
  </div>
);

// ── STEP 6: Achievements ──────────────────────────────────────────────────────
const ACHIEVEMENT_ICONS = ["🏆","⭐","🥇","🎯","🚀","💡","🎖️","🌟"];

export const AchievementsStep = ({ form, addItem, updateItem, removeItem }) => (
  <div>
    <div className="section-title">Achievements</div>
    <div className="section-sub">Awards, hackathons, publications, or notable wins</div>

    {form.achievements.map((a, i) => (
      <div key={i} className="sub-card">
        <div className="sub-card-header">
          <span className="sub-card-title">Achievement {i + 1}</span>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem("achievements", i)}>Remove</button>
        </div>
        <div className="form-group">
          <label className="form-label">Icon</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ACHIEVEMENT_ICONS.map(icon => (
              <button key={icon} type="button"
                style={{
                  width: 38, height: 38, fontSize: 18, borderRadius: 8, cursor: "pointer",
                  background: a.icon === icon ? "var(--accent-glow)" : "var(--bg)",
                  border: `1.5px solid ${a.icon === icon ? "var(--accent)" : "var(--border)"}`,
                }}
                onClick={() => updateItem("achievements", i, "icon", icon)}>{icon}</button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input className="form-input" placeholder="1st Place — National Hackathon"
            value={a.title} onChange={e => updateItem("achievements", i, "title", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" placeholder="March 2024"
              value={a.date} onChange={e => updateItem("achievements", i, "date", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={2} placeholder="Brief details about this achievement..."
            value={a.description} onChange={e => updateItem("achievements", i, "description", e.target.value)} />
        </div>
      </div>
    ))}
    <button type="button" className="add-row-btn"
      onClick={() => addItem("achievements", { title: "", description: "", date: "", icon: "🏆" })}>
      + Add Achievement
    </button>
  </div>
);

// ── STEP 7: Coding Profiles ───────────────────────────────────────────────────
const PLATFORMS = [
  { name: "LeetCode", icon: "🟨", url: "https://leetcode.com/u/" },
  { name: "Codeforces", icon: "🔵", url: "https://codeforces.com/profile/" },
  { name: "HackerRank", icon: "🟩", url: "https://hackerrank.com/profile/" },
  { name: "CodeChef", icon: "🟫", url: "https://codechef.com/users/" },
  { name: "GitHub", icon: "⬛", url: "https://github.com/" },
  { name: "GeeksForGeeks", icon: "🟢", url: "https://auth.geeksforgeeks.org/user/" },
];

export const CodingProfilesStep = ({ form, addItem, updateItem, removeItem }) => (
  <div>
    <div className="section-title">Coding Profiles</div>
    <div className="section-sub">Your competitive programming and developer profiles</div>

    {form.codingProfiles.map((p, i) => (
      <div key={i} className="sub-card">
        <div className="sub-card-header">
          <span className="sub-card-title">Profile {i + 1}</span>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem("codingProfiles", i)}>Remove</button>
        </div>
        <div className="form-group">
          <label className="form-label">Platform</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {PLATFORMS.map(pl => (
              <button key={pl.name} type="button"
                className={`btn btn-sm ${p.platform === pl.name ? "btn-primary" : "btn-ghost"}`}
                onClick={() => updateItem("codingProfiles", i, "platform", pl.name)}>
                {pl.icon} {pl.name}
              </button>
            ))}
          </div>
          <input className="form-input" placeholder="Or type custom platform name"
            value={p.platform || ""} onChange={e => updateItem("codingProfiles", i, "platform", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" placeholder="john_doe"
              value={p.username || ""} onChange={e => updateItem("codingProfiles", i, "username", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Profile URL</label>
            <input className="form-input" type="url" placeholder="https://leetcode.com/u/john"
              value={p.url || ""} onChange={e => updateItem("codingProfiles", i, "url", e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Rating / Rank (optional)</label>
            <input className="form-input" placeholder="1800 / Expert"
              value={p.rating || ""} onChange={e => updateItem("codingProfiles", i, "rating", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Problems Solved (optional)</label>
            <input className="form-input" placeholder="450"
              value={p.solved || ""} onChange={e => updateItem("codingProfiles", i, "solved", e.target.value)} />
          </div>
        </div>
      </div>
    ))}
    <button type="button" className="add-row-btn"
      onClick={() => addItem("codingProfiles", { platform: "", username: "", url: "", rating: "", solved: "" })}>
      + Add Coding Profile
    </button>
  </div>
);

// ── STEP 8: Contact & Social ──────────────────────────────────────────────────
export const ContactStep = ({ form, setNested }) => (
  <div>
    <div className="section-title">Contact & Social</div>
    <div className="section-sub">Let people reach out to you</div>

    <div className="sub-card" style={{ marginBottom: 20 }}>
      <div className="sub-card-header"><span className="sub-card-title">Contact Info</span></div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" type="email" placeholder="john@example.com"
          value={form.contact.email} onChange={e => setNested("contact", "email", e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input className="form-input" type="tel" placeholder="+91 98765 43210"
          value={form.contact.phone} onChange={e => setNested("contact", "phone", e.target.value)} />
      </div>
    </div>

    <div className="sub-card">
      <div className="sub-card-header"><span className="sub-card-title">Social Links</span></div>
      {[
        { key: "github", label: "GitHub", ph: "https://github.com/username" },
        { key: "linkedin", label: "LinkedIn", ph: "https://linkedin.com/in/username" },
        { key: "twitter", label: "Twitter / X", ph: "https://twitter.com/username" },
        { key: "website", label: "Personal Website", ph: "https://yoursite.com" },
      ].map(({ key, label, ph }) => (
        <div className="form-group" key={key}>
          <label className="form-label">{label}</label>
          <input className="form-input" type="url" placeholder={ph}
            value={form.socialLinks[key]} onChange={e => setNested("socialLinks", key, e.target.value)} />
        </div>
      ))}
    </div>
  </div>
);

// ── STEP 9: Theme ─────────────────────────────────────────────────────────────
const THEME_INFO = {
  dark:   { bg: "#080810", card: "#16162a", accent: "#6366f1", text: "#eeeef8", desc: "Deep midnight with indigo accents" },
  light:  { bg: "#f4f4f8", card: "#ffffff", accent: "#6366f1", text: "#111128", desc: "Clean and professional" },
  ocean:  { bg: "#020d1a", card: "#0a2238", accent: "#0ea5e9", text: "#d0eeff", desc: "Deep ocean blues" },
  forest: { bg: "#030f06", card: "#0c2614", accent: "#16a34a", text: "#ccf0d8", desc: "Lush forest greens" },
};

export const ThemeStep = ({ form, set }) => {
  const { setTheme } = useTheme();
  const pick = (id) => { set("theme", id); setTheme(id); };

  return (
    <div>
      <div className="section-title">Choose Theme</div>
      <div className="section-sub">Pick the visual style for your portfolio</div>

      <div className="form-group">
        <label className="form-label">Visibility</label>
        <div className="toggle-row" onClick={() => set("isPublic", !form.isPublic)}>
          <div className={`toggle-track ${form.isPublic ? "on" : ""}`}><div className="toggle-thumb" /></div>
          <span className="toggle-label">{form.isPublic ? "Public — anyone with link can view" : "Private — only you can view"}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
        {Object.entries(THEME_INFO).map(([id, t]) => {
          const selected = form.theme === id;
          return (
            <button key={id} type="button" onClick={() => pick(id)}
              style={{
                border: `2px solid ${selected ? t.accent : "var(--border)"}`,
                borderRadius: 14, overflow: "hidden", cursor: "pointer",
                background: "transparent", textAlign: "left",
                boxShadow: selected ? `0 0 24px ${t.accent}40` : "none",
                transform: selected ? "scale(1.02)" : "scale(1)",
                transition: "all 0.2s ease",
              }}>
              {/* Mini preview */}
              <div style={{ background: t.bg, padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 4, background: t.accent }} />
                  <div style={{ width: 40, height: 8, borderRadius: 3, background: t.text + "33", marginTop: 3 }} />
                </div>
                <div style={{ width: "60%", height: 10, borderRadius: 4, background: t.text + "cc", marginBottom: 6 }} />
                <div style={{ background: t.card, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ width: "80%", height: 7, borderRadius: 3, background: t.accent + "cc", marginBottom: 5 }} />
                  <div style={{ width: "100%", height: 5, borderRadius: 3, background: t.text + "33", marginBottom: 3 }} />
                  <div style={{ width: "70%", height: 5, borderRadius: 3, background: t.text + "22" }} />
                </div>
              </div>
              <div style={{ background: t.card, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: t.text, textTransform: "capitalize", marginBottom: 2 }}>{id}</div>
                  <div style={{ fontSize: 11, color: t.accent + "cc" }}>{t.desc}</div>
                </div>
                {selected && <span style={{ fontSize: 16 }}>✓</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
