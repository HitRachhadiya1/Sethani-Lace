import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify user authentication
export const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with the ID from token
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: User not found",
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed: Invalid token",
    });
  }
};

// Middleware to verify admin authentication
export const adminMiddleware = async (req, res, next) => {
  try {
    // Check for token in headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user with the ID from token
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: User not found",
      });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin privileges required",
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(403).json({
      success: false,
      message: "Admin authentication failed",
    });
  }
};
