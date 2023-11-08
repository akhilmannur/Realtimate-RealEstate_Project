import express from 'express';
import mongoose from 'mongoose';
import userRouterr from './Routes/userRoutes.js';
import dotenv from 'dotenv'
dotenv.config();


mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log('connected to mongodb');
})
.catch((err)=>{
    console.log(err);
})

const app= express();

app.use('/api/user',userRouterr)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})