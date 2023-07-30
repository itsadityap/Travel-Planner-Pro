const axios = require('axios');

const { CreateDestionation } = require('../../dtos/destinationDto');
const destinationModel = require('../../models/destinations')

async function addDestination(req, res) {
    try
    {
        // Axios call to get weather and coordinates
        const weatherResponse = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${req.body.cityName}`, {
            headers: {
                'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
                'X-RapidAPI-Host': process.env.WEATHER_API_HOST
            }
        });
        
        // Create destination object using DTO
        const destinationDtoObj = new CreateDestionation(
            req.body.destinationName,
            req.body.cityName,
            req.body.landmarks,
            weatherResponse.data.location.lat,
            weatherResponse.data.location.lon,
            req.body.state,
            req.body.description,
            req.body.images,
            req.body.avgTravelExpenses,
            req.body.attractions,
            req.body.category
        );
        
        await destinationModel.create(destinationDtoObj);

        return res.status(200).json({
            message: 'Destination added successfully'
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Error in adding destination',
            error: err
        });
    }
}

module.exports = {
    addDestination
}