const express = require('express');

const router = express.Router();

const userController = require("../controller/users.controller");
const upload = require('../middleware/multerConfig');


router.route('/')
    .get(userController.getAllUsers)
    
router.route('/register')
    .post(upload.single('avatar'), userController.register);

router.route('/login')
    .post(userController.login);

router.route('/:userId')
    .get(userController.getSingleUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;