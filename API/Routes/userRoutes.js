import  express  from 'express';
const userRouter= express.Router();
import verifyToken from '../middlewares/authMiddleWare.js'
import tryCatch from '../middlewares/tryCatch.js'
import { editAvatar,showUserBYId, updateUser } from '../Controllers/userControllers.js';


userRouter.put('/:id/avatar',verifyToken,tryCatch(editAvatar))
userRouter.get('/:id/userdetails',verifyToken,tryCatch(showUserBYId))
userRouter.put('/:id/updateuser',verifyToken,tryCatch(updateUser))

export default userRouter;