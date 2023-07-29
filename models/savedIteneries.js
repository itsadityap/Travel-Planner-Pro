const mongoose = require('mongoose');

const savedIteneries = new mongoose.Schema({
    savedIteneriesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itenery',
        unique: true
    }],
    savedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

module.exports = mongoose.model('savedIteneries', savedIteneries);