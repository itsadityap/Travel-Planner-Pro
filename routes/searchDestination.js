const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const searchDestinationController = require('../controllers/searchDestination');

router.post('/search-destination',
            authUser,
            searchDestinationRoute);

router.get('/get-all-keywords',
            authUser,
            getAllKeywordsRoute);

async function searchDestinationRoute(req, res) {
    searchDestinationController
        .searchDestination(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function getAllKeywordsRoute(req, res) {
    searchDestinationController
        .getAllKeywords(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;