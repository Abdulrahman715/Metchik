require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');

const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log("mongodb server started");
});

const categoriesRouter = require('./Router/categories.router');
const subCategoriesRouter = require('./Router/subcategories.router');
const productRouter = require("./Router/products.router");
const userRouter = require('./Router/users.router');
const ProductContain = require('./Router/productContain.router');
const favoriteRouter = require('./Router/favorite.router');
const cartRouter = require('./Router/cart.router');
const uploadImage = require('./Router/UploadImage.router');

app.use("/api/categories", categoriesRouter);
app.use("/api/subCategories", subCategoriesRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/ProductContain", ProductContain);
app.use("/api/favorite", favoriteRouter);
app.use("/api/cart", cartRouter);
app.use("/api/uploadImage", uploadImage);


app.all('*', (req, res, next) => {
    res.status(500).json({
        status: httpStatusText.ERROR,
        data: null,
        message: "the URL may be wrong"
    })
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        data: null,
        message: error.message || "some thing wrong",
    });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})