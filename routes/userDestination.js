const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const destinationController = require('../controllers/destination');

router.post('/get-destination',
            authUser,
            getDestinationRoute);

router.get('/get-all-destinations',
            authUser,
            getAllDestinationsRoute);

async function getDestinationRoute(req, res) {
    destinationController
        .getDestination(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getAllDestinationsRoute(req, res) {
    destinationController
        .getAllDestinations(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;