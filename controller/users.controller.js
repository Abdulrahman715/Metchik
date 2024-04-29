const User = require('../models/user.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = asyncWrapper(
    async (req, res,next) => {
    
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        const users = await User.find({}, { "__v": false }).limit(limit).skip(skip);
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                users
            }
        });
});


const getSingleUser = asyncWrapper(async(req, res,next) => {
    
    const user = await User.findById(req.params.userId);

    if (!user) {
        const error = appError.create("this User not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            user
        }
    });
});

const register = asyncWrapper(async(req, res,next) => {
    
    const { firstName, lastName, email, password, role, imageUrl } = req.body;

    const oldUser = await User.findOne({ firstName: firstName, email: email });
    if (oldUser) {
        const error = appError.create("this User is already exist", 400, httpStatusText.FAIL);
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: url,
        imageUrl
    });

    //generate jwt 
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });
    newUser.token = token;

    await newUser.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newUser
        }
    });
});

const login = asyncWrapper(async (req, res,next) => {
    const { email, password } = req.body;

    if (!email && !password) {
        const error = appError.create("please enter your data", 400, httpStatusText.FAIL);
        return next(error);
    }

    const user = await User.findOne({ email: email });
    

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {

        //generate jwt 
        const token = await generateJWT({ email: user.email, id: user._id, role: user.role });
        user.token = token;

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "login is successfully",
            data: {
                token
            }
        });
    } else {
        const error = appError.create("data wrong", 404, httpStatusText.FAIL);
        return next(error);
    }

})

const updateUser = asyncWrapper(async(req, res) => {
    const userId = req.params.userId;

    let updatedUser = await User.findByIdAndUpdate(userId, { $set: { ...req.body } });

    if (!updatedUser) {
        const error = appError.create("this User not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedUser
        }
    });
});

const deleteUser = asyncWrapper(async(req, res) => {
    await User.deleteOne({ _id: req.params.userId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "User is deleted successfully"
    });
});

module.exports = {
    getAllUsers,
    getSingleUser,
    register,
    login,
    updateUser,
    deleteUser
}