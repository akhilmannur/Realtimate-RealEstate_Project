import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
const adminRouter= express.Router();
import verifyToken from '../middlewares/authMiddleWare.js'
import { showAllUser,showListing, showListingById} from '../Controllers/AdminControllers.js';


adminRouter.get('/getalluser',trycatch(showAllUser))
adminRouter.get('/getalllisting',trycatch(showListing))
adminRouter.get('/getListingById/:id',trycatch(showListingById))

export default adminRouter;