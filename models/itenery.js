const mongoose = require('mongoose');

const itenerySchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
    },
    travelPeriod: {
        type: String,
        required: true,
    },
    travelMode: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    estimatedCost: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Itenery', itenerySchema);