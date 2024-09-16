import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import complaintRoutes from './routes/complaint.route.js';
import { exec } from 'child_process'; // Import child_process
import twilio from 'twilio'; // Import Twilio SDK

dotenv.config();

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["https://reddy-avenue-mp6wzbzwl-anusha-star11s-projects.vercel.app"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes for user, auth, and complaint
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/complaint', complaintRoutes);

// Twilio WhatsApp message route
app.post('/api/notify-whatsapp', (req, res) => {
  const { to, message } = req.body;
  
  if (!to || !message) {
    return res.status(400).json({ message: 'Recipient and message content are required' });
  }

  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: message,
      to: `whatsapp:${to}`
    })
    .then((msg) => {
      res.status(200).json({ message: 'WhatsApp message sent successfully', sid: msg.sid });
    })
    .catch((error) => {
      console.error('Twilio error:', error);
      res.status(500).json({ message: 'Failed to send WhatsApp message', error: error.message });
    });
});

// Trigger script execution
app.post('/api/run-script', (req, res) => {
  exec('node whatsappGroupNotifier.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err}`);
      return res.status(500).json({ message: 'Error executing script' });
    }
    console.log(`WhatsApp message sent: ${stdout}`);
    res.status(200).json({ message: 'Script executed successfully' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;  // Use export for Vercel serverless functions
