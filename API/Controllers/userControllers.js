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
        message:'Avatar updated successfully'
    })
} else{
    res.status(500).json({
        status:'error',
        message: 'updating avatar failed'
    })
}



}