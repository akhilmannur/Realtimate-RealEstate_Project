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