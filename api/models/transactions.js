const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bist: {
        type: Number,
        required: true
    },
    dollar: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('transaction', transactionSchema);