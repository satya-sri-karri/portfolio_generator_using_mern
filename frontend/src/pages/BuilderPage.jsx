/**
 * BuilderPage
 * 9-step portfolio builder — supports both CREATE and EDIT modes
 * Route: /builder (create) | /builder/:id (edit)
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortfolioForm } from "../hooks/usePortfolioForm";
import { createPortfolio, updatePortfolio, getPortfolioById } from "../utils/api";
import StepIndicator from "../components/shared/StepIndicator";
import {
  PersonalStep,
  SkillsStep,
  ProjectsStep,
  ExperienceStep,
  CertificationsStep,
  AchievementsStep,
  CodingProfilesStep,
  ContactStep,
  ThemeStep,
} from "../components/form/FormSteps";

const STEPS = [
  { id: "personal",    label: "Personal"      },
  { id: "skills",      label: "Skills"        },
  { id: "projects",    label: "Projects"      },
  { id: "experience",  label: "Experience"    },
  { id: "certs",       label: "Certs"         },
  { id: "achieve",     label: "Achievements"  },
  { id: "coding",      label: "Coding"        },
  { id: "contact",     label: "Contact"       },
  { id: "theme",       label: "Theme"         },
];

const BuilderPage = () => {
  const { id } = useParams();          // present = edit mode
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(isEdit);

  const {
    form, skillInput, setSkillInput,
    set, setNested,
    addSkill, addSkillDirect, removeSkill,
    addItem, updateItem, removeItem,
    load,
  } = usePortfolioForm();

  // If editing, load existing portfolio data
  useEffect(() => {
    if (!isEdit) return;
    const fetch = async () => {
      try {
        const res = await getPortfolioById(id, token);
        load(res.data);
      } catch {
        setError("Failed to load portfolio for editing.");
      } finally {
        setLoadingEdit(false);
      }
    };
    fetch();
  }, [id, isEdit, token]); // eslint-disable-line

  const handlePreview = () => {
    sessionStorage.setItem("preview-data", JSON.stringify(form));
    window.open("/preview", "_blank");
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.about.trim()) {
      setError("Name and About are required. Go back to Step 1.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await updatePortfolio(id, form, token);
        setSuccess({ id, slug: form.shareSlug, isEdit: true });
      } else {
        const res = await createPortfolio(form, token);
        setSuccess({ id: res.data.id, slug: res.data.shareSlug, isEdit: false });
      }
    } catch (err) {
      setError(err.message || "Failed to save portfolio.");
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    const props = { form, set, setNested, addItem, updateItem, removeItem };
    switch (step) {
      case 0: return <PersonalStep {...props} />;
      case 1: return <SkillsStep {...props} skillInput={skillInput} setSkillInput={setSkillInput} addSkill={addSkill} addSkillDirect={addSkillDirect} removeSkill={removeSkill} />;
      case 2: return <ProjectsStep {...props} />;
      case 3: return <ExperienceStep {...props} />;
      case 4: return <CertificationsStep {...props} />;
      case 5: return <AchievementsStep {...props} />;
      case 6: return <CodingProfilesStep {...props} />;
      case 7: return <ContactStep {...props} />;
      case 8: return <ThemeStep {...props} />;
      default: return null;
    }
  };

  // ── Loading state for edit ──────────────────────────────────────────────────
  if (loadingEdit) {
    return (
      <div className="loading-page">
        <div className="spinner" />
        <p className="muted">Loading portfolio...</p>
      </div>
    );
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (success) {
    const shareUrl = `${window.location.origin}/p/${success.slug}`;
    return (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "var(--bg)",
        }}
      >
        <div
          className="card fade-up"
          style={{ maxWidth: 540, width: "100%", padding: "44px 40px", textAlign: "center" }}
        >
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 10 }}>
            {success.isEdit ? "Portfolio Updated!" : "Portfolio Created!"}
          </h2>
          <p className="muted" style={{ marginBottom: 28 }}>
            Your portfolio is live and ready to share with the world.
          </p>

          {/* Share URL box */}
          <div
            style={{
              background: "var(--bg)",
              border: "1.5px solid var(--accent)",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 13,
                fontFamily: "var(--mono)",
                color: "var(--accent2)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {shareUrl}
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              Copy
            </button>
          </div>

          {/* How to share section */}
          <div
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 28,
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 800, marginBottom: 14, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              📤 How to Share
            </p>
            {[
              { icon: "🔗", text: "Copy the link above and paste it anywhere" },
              { icon: "💼", text: "Add it to your LinkedIn profile or resume" },
              { icon: "📧", text: "Include in email signatures or job applications" },
              { icon: "📱", text: "Share on WhatsApp, Twitter, or any social platform" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`/p/${success.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: "none" }}
            >
              👁 View Portfolio
            </a>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main builder UI ─────────────────────────────────────────────────────────
  return (
    <div className="builder-page">
      <div className="container-sm">
        {/* Page title */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="badge" style={{ marginBottom: 12 }}>
            {isEdit ? "✏ Edit Mode" : "✨ Portfolio Builder"}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
            {isEdit ? "Edit Your Portfolio" : "Build Your Portfolio"}
          </h1>
          <p className="muted">
            {isEdit
              ? "Update your information and save changes"
              : `Complete all ${STEPS.length} steps — takes about 5 minutes`}
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator steps={STEPS} current={step} onClick={setStep} />

        {/* Error banner */}
        {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>⚠ {error}</div>}

        {/* Step card */}
        <div className="builder-card">{renderStep()}</div>

        {/* Navigation */}
        <div className="builder-nav">
          <button
            className="btn btn-ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
          >
            ← Back
          </button>

          <div className="builder-nav-right">
            {/* Preview button — always shown */}
            <button className="btn btn-ghost" onClick={handlePreview}>
              👁 Preview
            </button>

            {step < STEPS.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setStep(s => s + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    {isEdit ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEdit ? "💾 Save Changes" : "🚀 Generate Portfolio"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Step counter */}
        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            fontSize: 12,
            marginTop: 16,
            fontFamily: "var(--mono)",
          }}
        >
          Step {step + 1} of {STEPS.length} — {STEPS[step].label}
        </p>
      </div>
    </div>
  );
};

export default BuilderPage;
