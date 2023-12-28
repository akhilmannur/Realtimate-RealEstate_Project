import User from "../models/userSchema.js";
import {
  joiUservalidationSchema,
  joiUserLoginvalidationSchema,
} from "../Models/validationSchema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import randomString from "randomstring";
import nodemailer from"nodemailer";
export const signUp = async (req, res) => {
  const { value, error } = joiUservalidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  const { name, email, username, password } = value;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      status: "error",
      message: "User already exists with this email.",
    });
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Error creating the user.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "User registration successfully completed",
  });
};

export const signIn = async (req, res) => {
  const { value, error } = joiUserLoginvalidationSchema.validate(req.body);

  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  const { username, password } = value;
  const user = await User.findOne({ username });

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const admintoken = jwt.sign(
      { username: username },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );

    return res.status(200).json({
      status: "admin_success",
      message: "Login successful",
      data: { jwt_token: admintoken },
    });
  }

  if (user) {
    if (!password || !user.password) {
      return res.json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const passwordverify = await bcryptjs.compare(password, user.password);

    if (!passwordverify) {
      return res.json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json({
      status: "user_success",
      message: "Login successful",
      data: token,
      rest:rest
    });
  } else {
    return res.json({
      status: "error",
      message: "User not found",
    });
  }
};

export const google = async (req, res) => {
  
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const gtoken = jwt.sign(
      { id: user._id },
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400}

    );
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .json({data:gtoken,
        rest:rest});
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser =  new User({
      username: req.body.name.split(' ').join('').toLowerCase() +
      Math.random().toString(36).slice(-4),
      name:req.body.name,  
      email: req.body.email,
      password: hashedPassword,
     avatar:req.body.avatar ,
    });
  
    const gtoken = jwt.sign(
      { id: newUser._id },
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );
    const { password: pass, ...rest } = newUser._doc;
    res.status(200).json({data:gtoken,
        rest:rest});
  }
};


export const forgetPassword=async(req,res)=>{
  const {email}=req.body;
  const userExist= await User.findOne({email:email})
  if(userExist){
    const token=randomString.generate()
  
  const user= await User.updateOne({email},{$set:{token:token}})
  sentResetPassword(email,token)
  res.status(200).send({message:"sent email succesfully",success:true})
  }
  else{
    res.status(400).send({message:"inavalid email",success:false})
  }
};


 export const sentResetPassword = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "To verify your mail",
      html: `http://localhost:5173/resetPassword?token=${token}> Please click here to Reset your Password...`,
    };

    const info = await transporter.sendMail(mailOption);

    // console.log("email has been sent", info.response);
  } catch (error) {
    console.log(error.message);
  }
};


export const changepassword = async(req,res) =>{
  const password = req.body.password
  const token = req.body.queryValues
  try {
    const userData = await User.findOne({token:token})  
  if(userData){
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const updatepassword = await User.findOneAndUpdate({token:token},{$set:{password:hashedPassword}})
    if(updatepassword){
      res.status(200)
      .send({message:"Password is updated successfully",success:true})
    }
  }
  else{
    res.status(404)
    .send({message:"Something went Wrong while Updating Password..."})
  }
  } catch (error) {
   console.log(error); 
  }
  }