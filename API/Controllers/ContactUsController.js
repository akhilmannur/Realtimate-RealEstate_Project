import ContactUs from "../models/ContactUsSchema.js";


export  const addMessage=async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        enquiryType,
        message,
    }=req.body;
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

    const sendMessage= await newMessage.save();
   

    return res.status(201).json({status: 'success',message:"message sent successfully", sendMessage});

}