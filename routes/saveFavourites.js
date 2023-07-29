const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const saveDestinationController = require('../controllers/saveDestinations');
const saveItenaryController = require('../controllers/saveItenaries');

router.post('/save-destination-toggle',
            authUser,
            saveDestinationController.saveDestinationToggle);

router.post('/save-itenary-toggle',
            authUser,
            saveItenaryController.saveIteneriesToggle);

router.get('/get-saved-destinations',
            authUser,
            saveDestinationController.getSavedDestinations);

router.get('/get-saved-itenaries',
            authUser,
            saveItenaryController.getIteneries);

module.exports = router;