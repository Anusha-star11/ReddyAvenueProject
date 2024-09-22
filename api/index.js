import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import complaintRoutes from './routes/complaint.route.js';
import { exec } from 'child_process';  // Import child_process
import twilio from 'twilio';  // Import Twilio SDK

dotenv.config();

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;  // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve();
const allowedOrigins = [
  'http://localhost:5173',  // For local frontend during development
  'https://reddyavenueproject.onrender.com'  // Your production frontend URL (removed trailing slash)
];

const app = express();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Define routes for the API
app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaint", complaintRoutes);

// Serve the static files for the React app (make sure this is before the wildcard route)
app.use(express.static(path.join(__dirname, 'ReddyAvenue', 'dist')));

// Serve React's index.html for any other routes (catch-all route)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'ReddyAvenue', 'dist', 'index.html'));
});

// Route to trigger WhatsApp message via Twilio
app.post('/api/notify-whatsapp', (req, res) => {
  const { to, message } = req.body;  // Expects 'to' and 'message' in the request body
  if (!to || !message) {
    return res.status(400).json({ message: 'Recipient and message content are required' });
  }

  client.messages
    .create({
      from: 'whatsapp:+14155238886',  // Twilio WhatsApp sandbox number
      body: message,  // The message you want to send
      to: `whatsapp:${to}`  // Recipient's WhatsApp number
    })
    .then((msg) => {
      res.status(200).json({ message: 'WhatsApp message sent successfully', sid: msg.sid });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to send WhatsApp message', error: error.message });
    });
});

// Trigger a script (example: WhatsApp notifier script)
app.post('/api/run-script', (req, res) => {
  exec('node whatsappGroupNotifier.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err}`);
      return res.status(500).json({ message: 'Error executing script' });
    }
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

// Start the server
app.listen(3147, () => {
  console.log("Server is running on port 3147!");
});
