import express from 'express';
import { signUp } from '../Controllers/authControllers.js';

const authRouter=express.Router();

authRouter.post("/signup",signUp)

export default authRouter;