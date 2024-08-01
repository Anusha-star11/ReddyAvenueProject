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

export const getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        next(error);
    }
};


export const updateComplaint = async (req, res, next) => {
    try {
      const updatedComplaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedComplaint) return next(errorHandler(404, "Complaint not found"));
      res.status(200).json(updatedComplaint);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteComplaint = async (req, res, next) => {
    try {
      const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
      if (!deletedComplaint) return next(errorHandler(404, "Complaint not found"));
      res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  export const getComplaintById = async (req, res, next) => {
    try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) return next(errorHandler(404, "Complaint not found"));
      res.status(200).json(complaint);
    } catch (error) {
      next(error);
    }
  };