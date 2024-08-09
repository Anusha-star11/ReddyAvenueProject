import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function safeside() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    complaint: '',
    raisedBy: '',
    status: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {currentUser}=useSelector(state=>state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.complaint || !formData.raisedBy || !formData.status) {
      setSuccessMessage(null);
      return setErrorMessage("Please fill all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const baseURL = "http://localhost:3147";
      console.log('Sending request to:', `${baseURL}/api/complaint/createcomplaint`);
      const res = await fetch(`${baseURL}/api/complaint/createcomplaint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: 'include', 
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setSuccessMessage(null);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setErrorMessage(null);
        setSuccessMessage("Complaint added successfully");
        setFormData({
          date: '',
          complaint: '',
          raisedBy: '',
          status: ''
        });

        // Set timeout to clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Complaint Details</h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="complaint">
              Complaint
            </label>
            <input
              type="text"
              id="complaint"
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="raisedBy">
              Raised By
            </label>
            <input
              type="text"
              id="raisedBy"
              name="raisedBy"
              value={formData.raisedBy}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {currentUser.user.isAdmin && <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>}
          
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-blue-500 p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default safeside;

import Complaint from '../models/complaint.model.js';
import { errorHandler } from "../utils/error.js";
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

export const createComplaint = async (req, res, next) => {
  console.log(req.body)
    if (!req.body.complaint || !req.body.raisedBy || !req.body.date) {
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