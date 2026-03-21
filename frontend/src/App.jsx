/**
 * App.jsx — Root component
 * Routes:
 *   /              → Landing page (public)
 *   /register      → Register (public)
 *   /login         → Login (public)
 *   /dashboard     → User dashboard (protected)
 *   /builder       → Create portfolio (protected)
 *   /builder/:id   → Edit portfolio (protected)
 *   /p/:slug       → Public portfolio view (no auth)
 *   /preview       → Live preview tab (no auth)
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/shared/Navbar";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import LandingPage    from "./pages/LandingPage";
import RegisterPage   from "./pages/RegisterPage";
import LoginPage      from "./pages/LoginPage";
import DashboardPage  from "./pages/DashboardPage";
import BuilderPage    from "./pages/BuilderPage";
import PortfolioPage  from "./pages/PortfolioPage";
import PreviewPage    from "./pages/PreviewPage";

// Pages that show the main Navbar
const WithNav = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public pages — with Navbar */}
            <Route path="/"         element={<WithNav><LandingPage /></WithNav>} />
            <Route path="/register" element={<WithNav><RegisterPage /></WithNav>} />
            <Route path="/login"    element={<WithNav><LoginPage /></WithNav>} />

            {/* Protected pages — with Navbar */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <WithNav><DashboardPage /></WithNav>
                </ProtectedRoute>
              }
            />
            <Route
              path="/builder"
              element={
                <ProtectedRoute>
                  <WithNav><BuilderPage /></WithNav>
                </ProtectedRoute>
              }
            />
            <Route
              path="/builder/:id"
              element={
                <ProtectedRoute>
                  <WithNav><BuilderPage /></WithNav>
                </ProtectedRoute>
              }
            />

            {/* Public portfolio view — NO Navbar (portfolio has its own nav) */}
            <Route path="/p/:slug" element={<PortfolioPage />} />

            {/* Preview tab — NO Navbar */}
            <Route path="/preview" element={<PreviewPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
