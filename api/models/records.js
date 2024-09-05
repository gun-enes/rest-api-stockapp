const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const recordSchema = new Schema({
    code: {
        type: String,
        required: true,
    },    
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('record', recordSchema);