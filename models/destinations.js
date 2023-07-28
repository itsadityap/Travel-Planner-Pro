const mongoose = require('mongoose');

const state = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands',
'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep',
'Puducherry']

const destinationSchema = new mongoose.Schema({
    destinationName: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    coordinatesX: {
        type: String,
        required: true,
    },
    coordinatesY: {
        type: String,
        required: true,
    },
    landmarks: {
        type: Array,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: [state]
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    avgTravelExpenses: {
        type: String,
        required: true,
    },
    weather: {
        type: String,
        required: true,
    },
    attractions: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Destination', destinationSchema);
