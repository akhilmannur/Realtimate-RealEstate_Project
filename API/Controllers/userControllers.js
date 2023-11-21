import User from "../models/userSchema.js";


export const  editAvatar=async(req,res)=>{
const {Avatar}=req.body;
const id=req.params.id
const user=await User.findOne({ _id:id });
if(user){
     await User.findByIdAndUpdate(id,{
        $set: {
            avatar:Avatar,
        }}) 
    res.status(200).json({
        status:'success',
        message:'Avatar updated successfully',
        data:user,
    })
} else{
    res.status(500).json({
        status:'error',
        message: 'updating avatar failed'
    })
}
}

export const  showUserBYId=async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched user data.",
      data: user,
    });
  }

  export const updateUser =async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;

      res.status(200).json({
        status:"success",
        message:"user updated succesfully",
        data:rest
      }
      )
    

  }