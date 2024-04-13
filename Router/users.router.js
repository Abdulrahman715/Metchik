const express = require('express');

const router = express.Router();

const userController = require("../controller/users.controller");
const verifyToken = require('../middleware/verifyToken');



router.route('/')
    .get(verifyToken,userController.getAllUsers)
    .post(userController.register)

router.route('/login')
    .post(userController.login);

router.route('/:userId')
    .get(userController.getSingleUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;