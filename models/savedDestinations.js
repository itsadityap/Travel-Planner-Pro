const mongoose = require('mongoose');

const savedDestinations = new mongoose.Schema({
    savedDestinationsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        unique: true
    }],
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model('savedDestinations', savedDestinations);