const express = require('express');

const router = express.Router();

const userController = require("../controller/users.controller");
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const appError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("file ", file);
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const fileName = `user - ${Date.now()}.${extension}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === "image") {
        return cb(null, true);
    } else {
        return cb(appError.create("the file must be an image", 400), false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
});


router.route('/')
    .get(verifyToken, userController.getAllUsers)
    .post(upload.single('avatar'), userController.register)

router.route('/login')
    .post(userController.login);

router.route('/:userId')
    .get(userController.getSingleUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;