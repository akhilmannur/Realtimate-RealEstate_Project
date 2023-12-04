import User from "../models/userSchema.js";





export const showAllUser= async (req, res) => {
    const alluser = await User.find();

    res.status(200).json({
      status: "success",
      message: "Successfully fetched user datas.",
      data: alluser,
    });
  };