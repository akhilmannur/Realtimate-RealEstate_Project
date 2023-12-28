import ContactUs from "../models/ContactUsSchema.js";

export const addMessage = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, enquiryType, message } =
    req.body;
  const { userRef } = req.body;

  const newMessage = new ContactUs({
    firstName,
    lastName,
    email,
    phoneNumber,
    enquiryType,
    message,
    userRef,
  });

  const sendMessage = await newMessage.save();

  return res.status(201).json({
    status: "success",
    message: "message sent successfully",
    sendMessage,
  });
};

export const showAllMessage = async (req, res) => {
  const allContact = await ContactUs.find().populate({
    path: "userRef",
    select: "-password",
  });

  if (!allContact) {
    return res
      .status(404)
      .json({ status: "failed", message: "no contact found" });
  }

  return res
    .status(200)
    .json({
      status: "success",
      message: "contact found successfully",
      allContact,
    });
};


export const  ShowMessageById =async(req,res)=>{
    const id = req.params.id;

    const userMessages = await ContactUs.findById(id)
    return res
    .status(200)
    .json({
      status: "success",
      message: "contact founded successfully",
      userMessages,
    });
};


 export const markAsRead = async(req,res)=>{
    const id= req.params.id;

    const updatedMessage = await ContactUs.findOneAndUpdate(
        { _id: id },
        { $set: { isRead: true } },
        { new: true } 
      );

      if (!updatedMessage) {
        return res.status(404).json({ status: 'failed', message: 'Message not found' });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Message marked as read successfully',
        updatedMessage,
      });
 }

 export const deleteMessage= async(req,res)=>{
    const id=req.params.id;

    const deletedMessage = await ContactUs.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ status: 'failed', message: 'Message not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Message deleted successfully',
      deletedMessage,
    });
 }