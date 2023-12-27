import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
import { changepassword, forgetPassword, google, signIn, signUp,} from '../Controllers/authControllers.js';

const authRouter=express.Router();

authRouter.post("/signup",trycatch(signUp));
authRouter.post("/signin",trycatch(signIn));
authRouter.post ("/google",trycatch(google));
authRouter.post ("/forgotpassword",trycatch(forgetPassword));
authRouter.post ("/resetpassword",trycatch(changepassword));

export default authRouter;