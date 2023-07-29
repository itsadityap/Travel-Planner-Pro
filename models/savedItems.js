const mongoose = require('mongoose');

const savedItems = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    savedDestinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
    }],
    savedItenaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itenary',
    }],
}, { timestamps: true });

module.exports = mongoose.model('SavedItems', savedItems);