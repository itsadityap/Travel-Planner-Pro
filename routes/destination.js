const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const destinationController = require('../controllers/admin/addDestinations');

router.post('/add-destination',
            authAdmin,
            addDestinationRoute);

async function addDestinationRoute(req, res) {
    destinationController
        .addDestination(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;