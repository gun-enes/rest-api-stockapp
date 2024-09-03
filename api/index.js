const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const user_routes = require('./routes/user'); // Import the routes
const stock_route = require('./routes/stock_routes');
const transaction_route = require('./routes/transaction_routes')

// Initialize the app
const app = express(); 
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/my_database');

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
//app.use('/stocks', stock_route);
app.use('/transactions', transaction_route);
app.use('/stocks', stock_route);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

