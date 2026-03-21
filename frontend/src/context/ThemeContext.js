import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const THEMES = [
  { id: "dark", emoji: "🌙", label: "Midnight" },
  { id: "light", emoji: "☀️", label: "Daylight" },
  { id: "ocean", emoji: "🌊", label: "Ocean" },
  { id: "forest", emoji: "🌿", label: "Forest" },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
