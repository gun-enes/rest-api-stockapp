const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stock_route = require('./routes/stock_routes');
const transaction_route = require('./routes/transaction_routes');
const record_route = require('./routes/record_routes');
const report_route = require('./routes/report_routes');
const Stock = require('./models/stocks')
const WebSocket = require('ws');

// Initialize the app
const app = express();
app.use(bodyParser.json());

//mongoose.connect('mongodb://mongo:27017/my_database');
mongoose.connect('mongodb://localhost:27017/my_database');

// Check the connection status
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Use the user routes
app.use('/transactions', transaction_route);
app.use('/stocks', stock_route);
app.use('/records', record_route);
app.use('/reports', report_route);

// Start the HTTP server
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Initialize the WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', async (message) => {
        const { operation, resource, data } = JSON.parse(message);
        let responseMessage;

        try {
            switch (operation) {
                case 'POST':
                    // Create a new stock entry
                    await Stock.create(data);
                    responseMessage = `Stock data for ${data.code} created.`;
                    break;
                
                case 'PATCH':
                    // Update an existing stock entry
                    await Stock.updateOne({ code: data.code }, data, { upsert: true });
                    responseMessage = `Stock data for ${data.code} updated.`;
                    break;
                
                case 'GET':
                    // Retrieve stock data
                    const stock = await Stock.findOne({ code: data.code });
                    responseMessage = stock ? stock : `Stock data for ${data.code} not found.`;
                    break;
                
                case 'DELETE':
                    // Delete a stock entry
                    await Stock.deleteOne({ code: data.code });
                    responseMessage = `Stock data for ${data.code} deleted.`;
                    break;
                
                default:
                    responseMessage = 'Unknown operation.';
            }
        } catch (error) {
            responseMessage = `Error handling ${operation} operation: ${error.message}`;
        }

        // Send the response back to the client
        ws.send(JSON.stringify({ operation, result: responseMessage }));
    });

    // Handle the client disconnecting
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});