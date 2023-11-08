import User from "../models/userSchema.js";
import joiUservalidationSchema from "../Models/validationSchema.js";

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

  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user.",
    });
  }
};
