const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        uniqe: true,
        validate: [validator.isEmail, "this field must be email address"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        min: [3, "too few password"],
        max: [10, "too large password"],
        validate: [
            {
                validator: function(value) {
                    // Use a regular expression to check if the password contains at least one uppercase letter
                    return /[A-Z]/.test(value);
                },
                message: props => `${props.value} does not contain an uppercase letter`
            },
            {
                validator: function(value) {
                    // Use a regular expression to check if the password contains at least one special character
                    return /[!@#$%^&*(),.?":{}|<>]/.test(value);
                },
                message: props => `${props.value} does not contain a special character`
            }
        ]
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        default: "uploads/profile.png"
    },
    imageUrl: {
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);