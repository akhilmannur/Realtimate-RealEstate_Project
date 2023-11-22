import express from 'express';
import mongoose from 'mongoose';
import userRouterr from './Routes/userRoutes.js';
import dotenv from 'dotenv'
import authRouterr from './Routes/authRoutes.js';
import listingRouter from './Routes/propertyListingRoutes.js';
import ErrorHandler from './middlewares/errorHandler.js';
dotenv.config();
import cors from 'cors';

const app= express();
app.use(cors());

mongoose.connect(process.env.MONGO_DB)
.then(()=>{
    console.log('connected to mongodb');
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use('/api/user',userRouterr);
app.use('/api/auth',authRouterr);
app.use('/api/list',listingRouter);
app.use(ErrorHandler);


app.listen(3000,()=>{
    console.log('listening on port 3000');
})