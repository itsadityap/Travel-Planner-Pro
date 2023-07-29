require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const logger = require('./services/logger');

const port = process.env.SERVER_PORT || 4000;

// Default Middlewares
app.use(cors());
app.use(helmet());
app.use(fileUpload());
app.use((req, res, next) => {
    express.json()(req, res, next);
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
    //logger.backendLoggerService.log({"level": "info", "message": "Connected to MongoDB"});
})
.catch((err) => {
    console.log(err);
    //logger.backendLoggerService.log({"level": "error", "message": err});
});

//Import Routes
const authUserRoute = require('./routes/authUser');
const userDestinationRoute = require('./routes/userDestination');
const userReviewRoute = require('./routes/reviews');
const userItenaryRoute = require('./routes/itenery');
const userSavedItemsRoute = require('./routes/saveFavourites');

//Admin Routes Imports
const destinationRoute = require('./routes/destination');
const authAdminRoute = require('./routes/authAdmin');

//Implement Routes
app.use('/api/v1', authUserRoute);
app.use('/api/v1', userDestinationRoute);
app.use('/api/v1', userReviewRoute);
app.use('/api/v1', userItenaryRoute);
app.use('/api/v1', userSavedItemsRoute);

app.use('/api/v1/admin', authAdminRoute);
app.use('/api/v1/admin', destinationRoute);

app.get('/test', (req, res) => {
    res.status(200).json({message: "Hello World from Traveller Backend Servers!"});
});

// Starting the server.
app.listen(port, () => {
    console.log(`Server is listening on PORT: ${port}`);
});