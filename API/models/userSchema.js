import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema= new mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
     },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
      },
},{timestamps:true});

userSchema.pre("save", async function (next) {
 
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
  
    next();
   
  });


const User= mongoose.model('User', userSchema);
export default User;