import express from 'express';
import { createComplaint, deleteComplaint, getAllComplaints, getComplaintById, updateComplaint } from '../controllers/complaint.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router=express.Router();

router.post("/createcomplaint",verifyToken, createComplaint);
router.get('/allcomplaints', getAllComplaints);
router.put('/updatecomplaint/:id',verifyToken, updateComplaint);
router.delete('/deletecomplaint/:id',verifyToken,  deleteComplaint);
router.get('/:id',verifyToken, getComplaintById);

export default router;