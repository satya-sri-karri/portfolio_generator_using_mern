/**
 * LoginPage
 * Existing user login — returns JWT stored in AuthContext
 */

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../utils/api";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to originally requested page after login, or dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password)
      return setError("Email and password are required.");

    setLoading(true);
    try {
      const res = await loginUser({ email: form.email.trim(), password: form.password });
      login(res.token, res.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-up">
        {/* Logo */}
        <div className="auth-logo">
          <h1>
            <span style={{ color: "var(--accent)" }}>◈</span>{" "}
            Portfolio<span style={{ color: "var(--accent)" }}>AI</span>
          </h1>
          <p>Welcome back — sign in to continue</p>
        </div>

        {error && <div className="alert alert-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={e => set("password", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? (
              <>
                <span
                  className="spinner"
                  style={{ width: 16, height: 16, borderWidth: 2 }}
                />
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
