const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const stockSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
            return today;
        }
    },
    price: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('stock', stockSchema);