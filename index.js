require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');

const app = express();

app.use(bodyParser.json());

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log("mongodb server started");
});

const categoriesRouter = require('./Router/categories.router');

app.use('/api/categories', categoriesRouter);

app.all('*', (req, res, next) => {
    res.status(500).json({
        status: httpStatusText.ERROR,
        data: null,
        message:"the URL may be wrong"
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})