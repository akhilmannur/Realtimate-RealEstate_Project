import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
import { signUp } from '../Controllers/authControllers.js';

const authRouter=express.Router();

authRouter.post("/signup",trycatch(signUp));

export default authRouter;