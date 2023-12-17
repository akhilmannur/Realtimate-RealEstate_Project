import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
import verifyToken from '../middlewares/authMiddleWare.js'
const chatRouter=express.Router();
import {accessChat} from '../Controllers/chatControllers.js'

chatRouter.post("/accesschat",verifyToken,trycatch(accessChat));

export default chatRouter;