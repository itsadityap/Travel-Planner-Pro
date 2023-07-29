const mongoose = require('mongoose');

const iteneryDetails = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    dayDetail: {
        type: String,
        required: true,
    },
});

const itenerySchema = mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    travelStartDate: {
        type: Date,
        required: true,
    },
    travelEndDate: {
        type: Date,
        required: true, 
    },
    travelMode: {
        type: String,
        required: true,
    },
    details: {
        type: [iteneryDetails],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    estimatedCost: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Itenery', itenerySchema);