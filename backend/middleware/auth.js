/**
 * Auth Middleware
 * Verifies JWT token on protected routes
 */

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided. Please login." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userName = decoded.name;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token. Please login again." });
  }
};

module.exports = authMiddleware;
