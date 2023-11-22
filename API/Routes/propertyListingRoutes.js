import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import trycatch from '../middlewares/tryCatch.js';
import { createListing } from '../Controllers/propertListingControllers.js';


const listingRouter= express.Router();

listingRouter.post('/createlisting',verifyToken,trycatch(createListing));


export default listingRouter;