import express from 'express';
import trycatch from '../middlewares/tryCatch.js';
import { ShowMessageById, addMessage, deleteMessage, markAsRead, showAllMessage } from '../Controllers/ContactUsController.js';
const ContactUSRouter=express.Router();


ContactUSRouter.post("/sendmessage", trycatch(addMessage));
ContactUSRouter.get("/getallmessage", trycatch(showAllMessage));
ContactUSRouter.get("/:id/getUserMessages", trycatch(ShowMessageById));
ContactUSRouter.put("/:id/markasread", trycatch(markAsRead));
ContactUSRouter.delete("/:id/deletemessage", trycatch(deleteMessage));
export default ContactUSRouter;