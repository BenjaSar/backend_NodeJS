import { generateToken } from "../data/token.js";
import logger from "../utils/logger.js";

const user = {
    userId: 1,
    useremail: "test@gmail.com",
    username: "test@gmail.com",
    password: "123456"
};



export const loginUser = (req, res) => {
  const { username, password } = req.body;
    //  Validate the user credentials
    if (username === 'test@gmail.com' && password === '123456') {
        const token = generateToken(user);
        logger.info(`User ${username} logged in successfully.`);
        res.json({ token });
    } else {
        logger.warn(`Failed login attempt for username: ${username}`);
        res.status(401).json({ message: 'Invalid credentials' });
    }   
};