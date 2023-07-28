const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const destinationController = require('../controllers/admin/addDestinations');

router.post('/add-destination',
            authAdmin,
            addDestinationRoute);

// router.get('/get-destination/:id',
//             authAdmin,
//             getDestinationRoute);

async function addDestinationRoute(req, res) {
    destinationController
        .addDestination(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

// async function getDestinationRoute(req, res) {
//     destinationController
//         .getDestination(req, res)
//         .then((data) => {})
//         .catch((err) => console.log(err));
// }

module.exports = router;