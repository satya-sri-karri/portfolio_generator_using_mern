/**
 * DashboardPage
 * Shows all portfolios for the logged-in user
 * Options: View, Edit, Delete, Copy Share Link
 */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyPortfolios, deletePortfolio } from "../utils/api";

const THEME_COLORS = {
  dark: "#6366f1",
  light: "#6366f1",
  ocean: "#0ea5e9",
  forest: "#16a34a",
};

const DashboardPage = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch user portfolios on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getMyPortfolios(token);
        setPortfolios(res.data);
      } catch (err) {
        setError("Failed to load portfolios.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  // Copy the public share URL to clipboard
  const handleCopyLink = (slug, id) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Delete portfolio with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deletePortfolio(id, token);
      setPortfolios(prev => prev.filter(p => p._id !== id));
    } catch {
      alert("Failed to delete. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner" />
        <p className="muted">Loading your portfolios...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h2>
            Welcome back,{" "}
            <span className="gradient-text">{user?.name?.split(" ")[0]}</span> 👋
          </h2>
          <p className="muted">Manage and share your portfolio websites</p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14,
            marginBottom: 32,
          }}
        >
          {[
            { label: "Total Portfolios", value: portfolios.length, icon: "📁" },
            {
              label: "Total Views",
              value: portfolios.reduce((a, p) => a + (p.views || 0), 0),
              icon: "👁",
            },
            { label: "Public", value: portfolios.filter(p => p.isPublic).length, icon: "🌐" },
          ].map(s => (
            <div
              key={s.label}
              className="card"
              style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}
            >
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Create new button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>Your Portfolios</h3>
          <Link to="/builder" className="btn btn-primary">
            + New Portfolio
          </Link>
        </div>

        {/* Portfolios grid */}
        {portfolios.length === 0 ? (
          <div className="empty-state card">
            <div className="icon">🗂️</div>
            <h3>No portfolios yet</h3>
            <p>Create your first portfolio and share it with the world!</p>
            <Link to="/builder" className="btn btn-primary">
              Build Your Portfolio
            </Link>
          </div>
        ) : (
          <div className="portfolios-grid">
            {portfolios.map(p => {
              const accentColor = THEME_COLORS[p.theme] || "#6366f1";
              const shareUrl = `${window.location.origin}/p/${p.shareSlug}`;
              return (
                <div key={p._id} className="card portfolio-card">
                  {/* Top bar with theme accent */}
                  <div
                    style={{
                      height: 4,
                      borderRadius: "13px 13px 0 0",
                      background: accentColor,
                      margin: "-24px -24px 20px",
                    }}
                  />

                  {/* Name & title */}
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  {p.title && (
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        marginBottom: 12,
                        fontWeight: 600,
                      }}
                    >
                      {p.title}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="portfolio-card-meta">
                    <span
                      className="badge"
                      style={{
                        background: `${accentColor}20`,
                        borderColor: accentColor,
                        color: accentColor,
                        fontSize: 11,
                        textTransform: "capitalize",
                      }}
                    >
                      {p.theme} theme
                    </span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>
                      👁 {p.views || 0} views
                    </span>
                  </div>

                  {/* Share URL box */}
                  <div
                    style={{
                      marginTop: 14,
                      padding: "10px 12px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted)",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {shareUrl}
                    </span>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: copiedId === p._id ? "var(--success)" : "var(--bg3)",
                        border: "1px solid var(--border)",
                        color: copiedId === p._id ? "#fff" : "var(--muted)",
                        padding: "4px 10px",
                        fontSize: 11,
                        borderRadius: 6,
                        flexShrink: 0,
                      }}
                      onClick={() => handleCopyLink(p.shareSlug, p._id)}
                    >
                      {copiedId === p._id ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="portfolio-card-actions">
                    <a
                      href={`/p/${p.shareSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}
                    >
                      👁 View
                    </a>
                    <Link
                      to={`/builder/${p._id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      ✏ Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                    >
                      {deletingId === p._id ? "..." : "🗑"}
                    </button>
                  </div>

                  {/* Created date */}
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 12,
                      fontFamily: "var(--mono)",
                    }}
                  >
                    Created{" "}
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
