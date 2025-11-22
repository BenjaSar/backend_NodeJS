import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_default_secret_key";

// Middleware to authenticate JWT tokens
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;

    next();
  } catch (err) {
    logger.error("Token verification failed", { error: err });
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
