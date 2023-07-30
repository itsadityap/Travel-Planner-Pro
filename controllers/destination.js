const axios = require('axios');

const { GetDestination } = require('../dtos/destinationDto');
const { ReviewsResponse } = require('../dtos/reviewsDto');
const destinationModel = require('../models/destinations')
const ReviewsModel = require('../models/reviews');

async function getDestination(req, res) {
    try
    {   
        if(!req.body.destination_id || req.body.destination_id.length != 24)
        {
            return res.status(400).json({
                message: 'Invalid destination_id'
            });
        }
        
        const destination = await destinationModel.findById(req.body.destination_id).lean();
        const reviews = await ReviewsModel.find({destination_id: req.body.destination_id}).lean();
        
        if(!destination)
        {
            return res.status(404).json({
                message: 'Destination not found'
            });
        }

        const weatherResponse = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${destination.cityName}`, {
            headers: {
                'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
                'X-RapidAPI-Host': process.env.WEATHER_API_HOST
            }
        });

        const destinationDtoObj = new GetDestination(
            destination._id,
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

        reviews.sort((a, b) => b.createdAt - a.createdAt);
        const reviewsDtoObj = reviews.map(review => new ReviewsResponse(
            review._id,
            req.userData.name,
            review.destination_id,
            review.user_id,
            review.rating,
            review.review,
            review.createdAt
        ));

        return res.status(200).json({
            message: 'Destination fetched successfully',
            data: {
                destinationDtoObj,
                reviewsDtoObj
            }
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
            destination._id,
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