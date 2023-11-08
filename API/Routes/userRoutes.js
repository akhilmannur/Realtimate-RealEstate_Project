import  express  from 'express';
const userRouter= express.Router();
import { test } from '../Controllers/userControllers.js';

userRouter.get('/test',test)

export default userRouter;