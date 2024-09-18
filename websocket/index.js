const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files (like the client HTML)
app.use(express.static('public'));

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Listen for messages from the client
    ws.on('message', (message) => {
        const decodedMessage = message.toString(); // Ensure it's treated as a string
        console.log(`Received: ${decodedMessage}`);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage); // Send as text
            }
        });
    });

    // Handle when a client disconnects
    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

