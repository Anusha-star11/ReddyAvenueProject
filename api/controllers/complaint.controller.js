import Complaint from '../models/complaint.model.js';
import { errorHandler } from "../utils/error.js";
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

export const createComplaint = async (req, res, next) => {
    if (!req.body.complaint || !req.body.raisedBy || !req.body.status) {
        return next(errorHandler(400, "Please provide all required fields"));
    }

    const newComplaint = new Complaint({
        ...req.body,
        
    });

    try {
        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        next(error);
    }
};
