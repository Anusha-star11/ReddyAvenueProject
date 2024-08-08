import jwt  from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken=(req,res,next)=>{
    // console.log('Cookies:', req.cookies);
    const token=req.cookies.access_token;
    
    // console.log('Token received:', token);
    if(!token){
        // console.log('No token found');
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
        if(err){
            console.log('Token verification failed:', err.message);
            return next(errorHandler(401, 'Unauthorized'));
        }
        console.log('Token verified successfully:', user);
        req.user=user;
        next();
    });
};
