import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';



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

app.listen(3457,()=>{
    console.log("Server is running on port 3000!");
});



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