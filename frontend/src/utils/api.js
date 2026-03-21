/**
 * API utility — all fetch calls to Express backend
 * Base URL uses React's proxy: /api → http://localhost:5000/api
 */

const BASE = process.env.REACT_APP_API_URL || "/api";

// Helper: build headers with optional JWT
const headers = (token) => {
  const h = { "Content-Type": "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

// Generic request wrapper
const request = async (method, url, body = null, token = null) => {
  const options = { method, headers: headers(token) };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${url}`, options);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = (body) => request("POST", "/auth/register", body);
export const loginUser = (body) => request("POST", "/auth/login", body);
export const getMe = (token) => request("GET", "/auth/me", null, token);

// ── Portfolio ─────────────────────────────────────────────────────────────────
export const createPortfolio = (body, token) => request("POST", "/portfolio", body, token);
export const getMyPortfolios = (token) => request("GET", "/portfolio/my", null, token);
export const getPortfolioById = (id, token) => request("GET", `/portfolio/${id}`, null, token);
export const updatePortfolio = (id, body, token) => request("PUT", `/portfolio/${id}`, body, token);
export const deletePortfolio = (id, token) => request("DELETE", `/portfolio/${id}`, null, token);

// PUBLIC — no token needed
export const getPublicPortfolio = (slug) => request("GET", `/portfolio/share/${slug}`);
