import User from "../models/userSchema.js";
import {
  joiUservalidationSchema,
  joiUserLoginvalidationSchema,
} from "../Models/validationSchema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

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
      status: 'error',
      message: error.message,
    });
  }

  const { username, password } = value;
  const user = await User.findOne({ username });

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const admintoken = jwt.sign(
      { username: username },
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );

    return res.status(200).json({
      status: 'admin_success',
      message: 'Login successful',
      data: { jwt_token: admintoken },
    });
  }

  if (user) {
    if (!password || !user.password) {
      console.log(password, user.password);
      return res.json({
        status: 'error',
        message: 'Incorrect password',
      });
    }

    const passwordverify = await bcryptjs.compare(password, user.password);

    if (!passwordverify) {
      return res.json({
        status: 'error',
        message: 'Incorrect password',
      });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.USER_ACCESS_TOKEN_SECRET,
      { expiresIn: 86400 }
    );

    return res.status(200).json({
      status: 'user_success',
      message: 'Login successful',
      data: token,
    });
  }
else{
  return res.json({
    status: 'error',
    message: 'User not found',
  });
};
};

