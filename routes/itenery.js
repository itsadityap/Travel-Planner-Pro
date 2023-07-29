const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const iteneryController = require('../controllers/itenary');

router.post('/add-itenery',
            authUser,
            addIteneryRoute);

router.post('/see-itenery',
            seeIteneryRoute)

router.get('/created-itenery-list', 
            authUser,
            createdItenRoute);
            

async function addIteneryRoute(req, res) {
    iteneryController
        .addItenery(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function seeIteneryRoute(req, res) {
    iteneryController
        .seeItenery(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

async function createdItenRoute(req, res) {
    iteneryController
        .createdIteniries(req, res)
        .then((data) => {})
        .catch((err) => console.log(err));
}

module.exports = router;