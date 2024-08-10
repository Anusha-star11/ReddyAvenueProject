import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Complaint from '../models/complaint.model.js';
import { errorHandler } from "../utils/error.js";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique name for the file
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5MB in this case)
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed (jpg, jpeg, png)'));
    }
    cb(null, true);
  }
}).array('images', 10); // Accept up to 10 images

export const createComplaint = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return next(errorHandler(500, `Multer error: ${err.message}`));
    } else if (err) {
      return next(errorHandler(500, `File upload failed: ${err.message}`));
    }

    const { complaint, raisedBy, date, status } = req.body;

    if (!complaint || !raisedBy || !date) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

    const newComplaint = new Complaint({
      complaint,
      raisedBy,
      date,
      status: status || 'pending',
      images: imagePaths, // Ensure images are stored here
    });

    try {
      const savedComplaint = await newComplaint.save();
      res.status(201).json({
        message: "Complaint added successfully",
        savedComplaint,
        imagePaths,
      });
    } catch (error) {
      next(error);
    }
  });
};



// Other controller methods remain unchanged...

export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

export const updateComplaint = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(errorHandler(500, `Multer error: ${err.message}`));
    }

    const { complaint, raisedBy, date, status } = req.body;

    let imagePaths = req.body.images || []; // Existing images
    if (req.files) {
      imagePaths = imagePaths.concat(req.files.map(file => `uploads/${file.filename}`)); // Add new image paths
    }

    try {
      const updatedComplaint = await Complaint.findByIdAndUpdate(
        req.params.id,
        {
          complaint,
          raisedBy,
          date,
          status,
          images: imagePaths,
        },
        { new: true }
      );

      if (!updatedComplaint) {
        return next(errorHandler(404, 'Complaint not found'));
      }

      res.status(200).json(updatedComplaint);
    } catch (error) {
      next(error);
    }
  });
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
