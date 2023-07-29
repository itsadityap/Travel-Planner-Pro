const SavedItemsModel = require('../models/savedIteneries');
const ItenaryModel = require('../models/itenery');
const { SavedItineraryDto } = require('../dtos/savedItineraryDto');

async function saveIteneriesToggle(req, res) {
    try
    {
        const { iteneryId } = req.body;
        if (!iteneryId || iteneryId.length != 24) return res.status(400).json({ message: 'Itenery id not provided' });
        const userId = req.userData.userID;

        const savedIteneries = await SavedItemsModel.findOne({ savedBy: userId });
        if (savedIteneries)
        {
            const index = savedIteneries.savedIteneriesList.indexOf(iteneryId);
            if (index > -1)
            {
                savedIteneries.savedIteneriesList.splice(index, 1);
            }
            else
            {
                savedIteneries.savedIteneriesList.push(iteneryId);
            }
            await savedIteneries.save();
            res.status(200).json({ message: 'Toggle Successful' });
        }
        else
        {
            const newSavedIteneries = new SavedItemsModel({
                savedIteneriesList: [iteneryId],
                savedBy: userId
            });
            await newSavedIteneries.save();
            res.status(200).json({ message: 'Itenery saved successfully' });
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getIteneries(req, res) {
    try
    {
        const userId = req.userData.userID;
        const savedIteneries = await SavedItemsModel.findOne({ savedBy: userId });
        if (savedIteneries)
        {
            const iteneries = await ItenaryModel.find({ _id: { $in: savedIteneries.savedIteneriesList } });
            
            const savedIteneriesObj = iteneries.map(iten => new SavedItineraryDto(iten._id, iten.planName, iten.destination, iten.travelStartDate, iten.travelEndDate, iten.travelMode, iten.details, iten.estimatedCost, iten.createdBy));
            
            res.status(200).json({ iteneries: savedIteneriesObj });
        }
        else
        {
            res.status(404).json({ iteneries: [] });
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: 'Internal server error, while getting Itenary List' });
    }
}

module.exports = {
    saveIteneriesToggle,
    getIteneries
}