import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme, THEMES } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <nav className="navbar">
      <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-brand">
        <span style={{ color: "var(--accent)", fontSize: 22 }}>◈</span>
        Portfolio<span className="dot">AI</span>
      </Link>

      <div className="navbar-actions">
        {/* Theme switcher */}
        <div className="theme-switcher">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`theme-btn ${theme === t.id ? "active" : ""}`}
              onClick={() => setTheme(t.id)}
              title={t.label}
            >
              {t.emoji}
            </button>
          ))}
        </div>

        {isLoggedIn ? (
          <>
            <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 600 }}>
              Hey, {user?.name?.split(" ")[0]}
            </span>
            <Link to="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
