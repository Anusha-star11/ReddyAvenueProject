import mongoose from 'mongoose';

// Define the schema for complaints
const complaintSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  complaint: {
    type: String,
    required: true,
    trim: true,
  },
  raisedBy: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['resolved', 'pending', 'inprogress'],
    default: 'pending',
    required:false,
  },
  image:{
    type:String,
    default:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
},
});

// Create and export the Complaint model
const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
