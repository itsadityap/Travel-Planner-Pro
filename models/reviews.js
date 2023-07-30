const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    destination_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);