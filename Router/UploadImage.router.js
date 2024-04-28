const express = require('express');

const router = express.Router();

const uploadImage = require("../controller/uploadImage.controller");
const upload = require("../middleware/multerConfig");

router.route('/')
    .post(upload.single('image'), uploadImage.createuploadImage);


module.exports = router;