const axios = require('axios');

const { GetDestination } = require('../dtos/destinationDto');
const destinationModel = require('../models/destinations')

async function getDestination(req, res) {
    try
    {   
        if(!req.body.destination_id || req.body.destination_id.length != 24)
        {
            return res.status(400).json({
                message: 'Invalid destination_id'
            });
        }
        const destination = await destinationModel.findById(req.body.destination_id);

        if(!destination)
        {
            return res.status(404).json({
                message: 'Destination not found'
            });
        }

        const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${destination.cityName}&key=${process.env.WEATHER_API}&aqi=no`);
        
        const destinationDtoObj = new GetDestination(
            destination.destinationName,
            destination.cityName,
            destination.latitude,
            destination.longitude,
            destination.landmarks,
            destination.state,
            destination.description,
            destination.images,
            destination.avgTravelExpenses,
            destination.attractions,
            destination.category,
            weatherResponse.data.current.condition.text,
            weatherResponse.data.current.condition.icon,
            weatherResponse.data.current.temp_c,
        );

        return res.status(200).json({
            message: 'Destination fetched successfully',
            data: destinationDtoObj
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Error in fetching destination',
            error: err
        });
    }
}

async function getAllDestinations(req, res) {
    try
    {
        const destinations = await destinationModel.find().lean();

        if(!destinations)
        {
            return res.status(404).json({
                message: 'Destinations not found'
            });
        }

        const destinationDtoObj = destinations.map(destination => new GetDestination(
            destination.destinationName,
            destination.cityName,
            destination.latitude,
            destination.longitude,
            destination.landmarks,
            destination.state,
            destination.description,
            destination.images,
            destination.avgTravelExpenses,
            destination.attractions,
            destination.category
        ));

        return res.status(200).json({
            message: 'Destinations fetched successfully',
            data: destinationDtoObj
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Error in fetching destinations',
            error: err
        });
    }
}

module.exports = {
    getDestination,
    getAllDestinations
}