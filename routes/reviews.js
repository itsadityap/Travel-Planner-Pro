const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const reviewController = require('../controllers/reviews');

router.post('/add-review',
            authUser,
            addReviewRoute);

async function addReviewRoute(req, res) {
    reviewController
        .addReview(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;