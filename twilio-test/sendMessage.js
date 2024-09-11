// sendMessage.js
const twilio = require('twilio');

// Replace these values with your Twilio Account SID and Auth Token
const accountSid = 'ACdd263727b3eec002a0c227326964a8a4';
const authToken = '4e21fd838f0cab06271d4e76d283a4a6';

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to send a WhatsApp message
async function sendWhatsAppMessage() {
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio WhatsApp Sandbox Number
      to: 'whatsapp:+918125353350', // Replace with the recipient's WhatsApp number
      body: 'Hello Anusha from Twilio!',
    });
    console.log(`Message sent successfully with SID: ${message.sid}`);
  } catch (error) {
    console.error('Failed to send message:', error.message);
  }
}

// Call the function
sendWhatsAppMessage();
