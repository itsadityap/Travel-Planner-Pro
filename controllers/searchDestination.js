const destinationModel = require('../models/destinations');

const { GetDestination } = require('../dtos/destinationDto');

async function getAllKeywords(req, res) {
    try 
    {
        const destinations = await destinationModel.find().lean();
        let keywords = [];
        
        destinations.forEach((destination) => {
            keywords.push(...destination.destinationName.split(' '));
            keywords.push(...destination.cityName.split(' '));
            keywords.push(...destination.state.split(' '));
            keywords.push(...destination.category.split(' '));
            destination.attractions.forEach((attraction) => {
                keywords.push(attraction);
            });
            destination.landmarks.forEach((landmark) => {
                keywords.push(landmark);
            });

        });

        keywords = [...new Set(keywords)];

        keywords.sort();

        res.status(200).json({ keywords });
    } 
    catch (err) 
    {
        res.status(500).json({ message: "Internal Server Error, while fetching the keywords" });
    }
}

async function searchDestination(req, res) {
    try 
    {
        const { keyword } = req.body;
        if(!keyword || keyword.length === 0) return res.status(400).json({ error: "Please provide a keyword" });
        const destinations = await destinationModel.find().lean();

        let filteredDestinations = destinations.filter((destination) => {
            return (destination.destinationName.toLowerCase().includes(keyword.toLowerCase()) ||
                    destination.cityName.toLowerCase().includes(keyword.toLowerCase()) ||
                    destination.state.toLowerCase().includes(keyword.toLowerCase()) ||
                    destination.category.toLowerCase().includes(keyword.toLowerCase()) ||
                    destination.attractions.some((attraction) => {
                        return attraction.toLowerCase().includes(keyword.toLowerCase());
                    }) ||
                    destination.landmarks.some((landmark) => {
                        return landmark.toLowerCase().includes(keyword.toLowerCase());
                    }));
        });

        // Transforming the filteredDestinations to DTOs
        let destinationObject = filteredDestinations.map((destination) => { return new GetDestination( destination._id, destination.destinationName, destination.cityName, destination.latitude, destination.longitude, destination.landmarks, destination.state, destination.description, destination.images, destination.avgTravelExpenses, destination.attractions, destination.category, destination.currentWeather, destination.weatherIcon, destination.currentTemperature ); });

        res.status(200).json({ destinations: destinationObject });
    } 
    catch (err)
    {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    searchDestination,
    getAllKeywords
}