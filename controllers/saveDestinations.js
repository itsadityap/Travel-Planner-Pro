const SavedItemsModel = require('../models/savedDestinations');
const DestinationModel = require('../models/destinations');

const SavedDestonationDto = require('../dtos/savedDestinationDto');

async function saveDestinationToggle (req, res) 
{
    try 
    {
        const { destinationId } = req.body;
        if(!destinationId || destinationId.length != 24) return res.status(400).json({ message: 'Destination id not provided' });
        const userId = req.userData.userID;
        const savedDestination = await SavedItemsModel.findOne({ savedBy: userId });
        if (savedDestination)
        {
            const index = savedDestination.savedDestinationsList.indexOf(destinationId);
            if (index > -1)
            {
                savedDestination.savedDestinationsList.splice(index, 1);
            }
            else
            {
                savedDestination.savedDestinationsList.push(destinationId);
            }
            await savedDestination.save();
            res.status(200).json({ message: 'Toggle Successful' });
        }
        else
        {
            const newSavedDestination = new SavedItemsModel({
                savedDestinationsList: [destinationId],
                savedBy: userId
            });
            await newSavedDestination.save();
            res.status(200).json({ message: 'Destination saved successfully' });
        }
    }
    catch (err) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getSavedDestinations (req, res) 
{
    try
    {
        const userId = req.userData.userID;
        const savedDestination = await SavedItemsModel.findOne({ savedBy: userId });
        if (savedDestination)
        {
            const destinations = await DestinationModel.find({ _id: { $in: savedDestination.savedDestinationsList } });
            
            const savedDestObj = destinations.map(dest => new SavedDestonationDto(dest._id, dest.destinationName, dest.cityName, dest.landmarks, dest.latitude, dest.longitude, dest.state, dest.description, dest.images, dest.avgTravelExpenses, dest.attractions, dest.category));

            res.status(200).json({ destinations: savedDestObj });
        }
        else
        {
            res.status(200).json({ destinations: [] });
        }
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    saveDestinationToggle,
    getSavedDestinations
}