import express from 'express'; 
import { loginUser } from '../controllers/auth.controller.js';

const routes = express.Router();

// Login route
routes.post('/login', loginUser);

export default routes