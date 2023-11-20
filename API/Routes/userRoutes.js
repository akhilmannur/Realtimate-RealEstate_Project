import  express  from 'express';
const userRouter= express.Router();
import verifyToken from '../middlewares/authMiddleWare.js'
import tryCatch from '../middlewares/tryCatch.js'
import { editAvatar } from '../Controllers/userControllers.js';


userRouter.put('/:id/avatar',verifyToken,tryCatch(editAvatar))

export default userRouter;