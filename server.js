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

app.get('/test', (req, res) => {
    res.status(200).json({message: "Hello World from Rywards Backend Servers!"});
});

// Starting the server.
app.listen(port, () => {
    console.log(`Server is listening on PORT: ${port}`);
});