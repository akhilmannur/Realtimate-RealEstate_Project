import express from 'express';
import verifyToken from '../middlewares/authMiddleWare.js';
import trycatch from '../middlewares/tryCatch.js';
import { createListing, deleteListing, getListing, getListings, } from '../Controllers/propertListingControllers.js';



const listingRouter= express.Router();

listingRouter.post('/createlisting',verifyToken,trycatch(createListing));
listingRouter.delete('/:id/deletelisting',verifyToken,trycatch(deleteListing));
listingRouter.get('/:id/getlisting',verifyToken,trycatch(getListing));
listingRRouter.get('/getlistings',trycatch(getListings))


export default listingRouter;
