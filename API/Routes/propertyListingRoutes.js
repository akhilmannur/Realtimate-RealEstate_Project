import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import trycatch from '../middlewares/tryCatch.js';
import { createListing, deleteListing, getAllListing, getListing, getListings, } from '../Controllers/propertListingControllers.js';



const listingRouter= express.Router();

listingRouter.post('/createlisting',verifyToken,trycatch(createListing));
listingRouter.delete('/:id/deletelisting',verifyToken,trycatch(deleteListing));
listingRouter.get('/:id/getlisting',trycatch(getListing));
listingRouter.get('/getalllisting',trycatch(getAllListing));
listingRouter.get('/getlistings',trycatch(getListings));


export default listingRouter;
