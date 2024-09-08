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
        type: String,
        required: true,
    },
})

//recordSchema.pre('save', function (next) {
//    this.date = this.date.toISOString().split('T')[0];  // Convert to YYYY-MM-DD format
//    next();
//});
module.exports = mongoose.model('record', recordSchema);