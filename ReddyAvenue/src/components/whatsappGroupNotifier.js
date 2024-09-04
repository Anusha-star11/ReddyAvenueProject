// whatsappGroupNotifier.js
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this QR code with your WhatsApp
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');

    // Function to send a message to a group by its name
    const sendMessageToGroup = async (groupName, message) => {
        const chats = await client.getChats();
        const group = chats.find(chat => chat.isGroup && chat.name === groupName);
        
        if (group) {
            await client.sendMessage(group.id._serialized, message);
            console.log(`Message sent to group ${groupName}`);
        } else {
            console.log(`Group ${groupName} not found`);
        }
    };

    // Example: Sending a message to the "Society Group"
    const groupName = "Society Group"; // Replace with your group name
    const message = "A new complaint has been raised. Please check the details in the complaint system.";
    
    sendMessageToGroup(groupName, message);
});

client.initialize();
