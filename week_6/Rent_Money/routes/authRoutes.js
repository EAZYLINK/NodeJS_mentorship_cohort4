import express from 'express';
import { loginController } from '../middleware/auth.js';

export const authRouter = express.Router();

authRouter.post('/login', loginController);