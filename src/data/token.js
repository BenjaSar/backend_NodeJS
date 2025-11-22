import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY; 
if (!SECRET_KEY) {
  console.error("❌ ERROR: JWT_SECRET_KEY is missing in .env file");
  logger.error("JWT_SECRET_KEY is missing in .env file");
  process.exit(1);
}


export function generateToken(userdata) {
  const payload = {
    userId: userdata.userId,
    useremail: userdata.useremail,
  };
  const expiresIn = "1h"; // Token expiration time
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
