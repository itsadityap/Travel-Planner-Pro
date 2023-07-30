const ItenaryModel = require('../models/itenery');
const {ItenaryRequest, IteneryResponse} = require('../dtos/itenery');

async function addItenery(req, res) 
{
    try
    {
        const { planName, destination, travelStartDate, travelEndDate, travelMode, details, estimatedCost } = req.body;
        const createdBy = req.userData.userID;

        if(travelStartDate > travelEndDate)
        {
            return res.status(400).json({
                error: 'Travel start date cannot be greater than travel end date'
            });
        }
        for(let i=0; i<details.length; i++)
        {
            if(details[i].day < travelStartDate || details[i].day > travelEndDate)
            {
                return res.status(400).json({
                    error: 'Day in details cannot be less than travel start date or greater than travel end date'
                });
            }
        }

        const iteneryRequest = new ItenaryRequest(planName, destination, travelStartDate, travelEndDate, travelMode,details,estimatedCost, createdBy);
        
        await ItenaryModel.create(iteneryRequest);
        return res.status(200).json({
            message: 'Itenery added successfully'
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Internal server error while adding itenery',
            error: err
        });
    }
}

async function seeItenery(req, res)
{
    try
    {
        const { iteneryId } = req.body;
        const iten = await ItenaryModel.findById(iteneryId).lean();
        if(!iten)
        {
            return res.status(404).json({
                message: 'Itenery does not exist'
            });
        }

        const itenObject = new IteneryResponse(iten._id, iten.planName, iten.destination, iten.travelStartDate, iten.travelEndDate, iten.travelMode,iten.details ,iten.travelMode)
        
        return res.status(200).json({
            message:"Itenery Fetched Succesfully",
            data: itenObject
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Internal server error while seeing itenery',
            error: err
        });
    }
}

async function createdIteniries(req, res)
{
    try
    {
        const iten = await ItenaryModel.find({userId: req.userData.userId}).lean();
        if(!iten)
        {
            return res.status(404).json({
                message: 'Itenery does not exist'
            });
        }
        const itenObject = iten.map(it => new IteneryResponse(it._id, it.planName, it.destination, it.travelStartDate, it.travelEndDate, it.travelMode,it.details ,it.travelMode));

        return res.status(200).json({
            message:"Itenery Fetched Succesfully",
            data: itenObject
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Internal server error while seeing itenery',
            error: err
        });
    }
}

module.exports = {
    addItenery,
    seeItenery,
    createdIteniries
};