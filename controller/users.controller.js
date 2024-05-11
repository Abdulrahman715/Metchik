require('dotenv').config();

const User = require('../models/user.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { "__v": false}).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { users }
    });
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        const error = appError.create("User not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { user }
    });
});

const register = asyncWrapper(async (req, res, next) => {
    const { userName, email, password, role, imageUrl } = req.body;

    const oldUser = await User.findOne({ userName, email });
    if (oldUser) {
        const error = appError.create("User already exists", 400, httpStatusText.FAIL);
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
        role,
        avatar: url,
        imageUrl
    });

    // Generate JWT
    const token = await generateJWT({ email: newUser.email, id: newUser._id, role: newUser.role });

    // Set JWT in cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    await newUser.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: { newUser }
    });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = appError.create("Please enter your email and password", 400, httpStatusText.FAIL);
        return next(error);
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = appError.create("Incorrect email or password", 401, httpStatusText.FAIL);
        return next(error);
    }

    // Generate JWT
    const token = await generateJWT({ email: user.email, id: user._id, role: user.role });

    // Set JWT in cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Login successful",
        data: { user }
    });
});

const updateUser = asyncWrapper(async (req, res, next) => {
    const userId = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });

    if (!updatedUser) {
        const error = appError.create("User not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { updatedUser }
    });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    await User.deleteOne({ _id: req.params.userId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "User deleted successfully"
    });
});

module.exports = {
    getAllUsers,
    getSingleUser,
    register,
    login,
    updateUser,
    deleteUser
};
