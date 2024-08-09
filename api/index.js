import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import complaintRoutes from './routes/complaint.route.js'
import { verifyToken } from './utils/verifyUser.js';



dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDb is  connected")
}).catch((error)=>{
    console.log(error)
});

const __dirname=path.resolve();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use('/uploads', express.static('uploads'));


app.listen(3147,()=>{
    console.log("Server is running on port 3147!");
});
app.options('*', cors());
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaint", verifyToken,complaintRoutes);



app.use(express.static(path.join(__dirname, '/ReddyAvenue/dist')));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, 'ReddyAvenue', 'dist' , 'index.html'));
});

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})