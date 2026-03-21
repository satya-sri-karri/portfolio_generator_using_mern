/**
 * RegisterPage
 * New user registration with name, email, password
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../utils/api";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password)
      return setError("All fields are required.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");

    setLoading(true);
    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      login(res.token, res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed.");
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
          <p>Create your account to get started</p>
        </div>

        {error && <div className="alert alert-error">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={e => set("name", e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={e => set("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={e => set("password", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={e => set("confirm", e.target.value)}
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
                <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Creating account...
              </>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
