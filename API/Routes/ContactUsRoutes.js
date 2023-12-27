import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
import { addMessage } from '../Controllers/ContactUsController.js';
const ContactUSRouter=express.Router();


ContactUSRouter.post("/sendmessage", trycatch(addMessage));
export default ContactUSRouter;