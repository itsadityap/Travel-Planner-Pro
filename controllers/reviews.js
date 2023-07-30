const ReviewModel = require('../models/reviews');
const DestinationModel = require('../models/destinations');
const UserModel = require('../models/user');

const { ReviewsRequest } = require('../dtos/reviewsDto');

async function addReview(req, res) {
    try
    {
        const { review, rating, destination_id } = req.body;        
        const user_id = req.userData.userID; 
        
        if(destination_id == null || destination_id == null || destination_id.length != 24 || user_id.length != 24)
        {
            return res.status(400).json({
                message: 'Invalid destination_id or user_id'
            });
        }

        const destinationObj = await DestinationModel.findById(destination_id).lean();
        if(!destinationObj)
        {
            return res.status(400).json({
                message: 'Destination does not exist, please check destination_id'
            });
        }

        // Check for valid user_id
        const userObj = await UserModel.findById(req.userData.userID).lean();
        if(!userObj)
        {
            return res.status(400).json({
                message: 'User does not exist, please check user_id'
            });
        }

        // Check if user has already reviewed this destination
        const reviewObj = await ReviewModel.findOne({ user_id, destination_id }).lean();
        if(reviewObj)
        {
            return res.status(400).json({
                message: 'You have already reviewed this destination, you can add only one review per destination'
            });
        }

        // Create review object using DTO
        const reviewRequest = new ReviewsRequest(destination_id, req.userData.userID, rating, review);

        // Save review object to database
        await ReviewModel.create(reviewRequest);

        return res.status(200).json({
            message: 'Review added successfully'
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: 'Internal server error while adding review',
            error: err
        });
    }
}

module.exports = {
    addReview
}