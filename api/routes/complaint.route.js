import express from 'express';
import { createComplaint, deleteComplaint, getAllComplaints, getComplaintById, updateComplaint } from '../controllers/complaint.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';


const router=express.Router();

router.post("/createcomplaint", createComplaint);
router.get('/allcomplaints', getAllComplaints);
router.put('/updatecomplaint/:id', updateComplaint);
router.delete('/deletecomplaint/:id',  deleteComplaint);
router.get('/:id', getComplaintById);

export default router;