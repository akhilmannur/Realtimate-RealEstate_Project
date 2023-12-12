import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
const adminRouter= express.Router();
import verifyToken from '../middlewares/authMiddleWare.js'
import { listingPerMonth, showAllUser,showListing, showListingById, showPropertiesBasedOnUser, showUserById, typeCount, usersPermonth} from '../Controllers/AdminControllers.js';


adminRouter.get('/getalluser',trycatch(showAllUser))
adminRouter.get('/getalllisting',trycatch(showListing))
adminRouter.get('/getListingById/:id',trycatch(showListingById))
adminRouter.get('/getUserById/:id',trycatch(showUserById))
adminRouter.get('/getpropertiesByUser/:id',trycatch(showPropertiesBasedOnUser))
adminRouter.get('/usersjoinedpermonth',trycatch(usersPermonth))
adminRouter.get('/listingpermonth',trycatch(listingPerMonth))
adminRouter.get('/typecount',trycatch(typeCount))

export default adminRouter;