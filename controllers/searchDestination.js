const destinationModel = require('../models/destinations');

async function searchDestination(req, res) {
    try 
    {
        const { keyword } = req.body;
        const destinations = await destinationModel.find({ name: { $regex: keyword, $options: 'i' } });
        res.status(200).json({ destinations });
    } 
    catch (err) 
    {
        res.status(500).json({ message: err.message });
    }
}

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
        console.log(err);
        res.status(500).json({ message: "Internal Server Error, while fetching the keywords" });
    }
}

module.exports = {
    searchDestination,
    getAllKeywords
}