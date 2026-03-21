/**
 * ProtectedRoute
 * Wraps routes that require the user to be logged in.
 * Redirects to /login and remembers the original destination.
 */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Still checking localStorage for saved session
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexDirection: "column",
        }}
      >
        <div className="spinner" />
        <p className="muted">Checking session...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Pass the attempted URL so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
