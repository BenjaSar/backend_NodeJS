import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your actual secret key

export function generateToken(userdata) {
  const userdata = {
    userId: userdata.userId,
    useremail: userdata.useremail,
  };
  const expiresIn = "1h"; // Token expiration time
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
