import  express  from 'express';
const userRouter= express.Router();
import verifyToken from '../middlewares/authMiddleWare.js'
import tryCatch from '../middlewares/tryCatch.js'
import { deleteUser, editAvatar,showUserBYId, updateUser,getUserListings } from '../Controllers/userControllers.js';


userRouter.put('/:id/avatar',verifyToken,tryCatch(editAvatar))
userRouter.get('/:id/userdetails',verifyToken,tryCatch(showUserBYId))
userRouter.put('/:id/updateuser',verifyToken,tryCatch(updateUser))
userRouter.delete('/:id/deleteuser',verifyToken,tryCatch(deleteUser))
userRouter.get('/:id/listing',verifyToken,tryCatch(getUserListings))

export default userRouter;