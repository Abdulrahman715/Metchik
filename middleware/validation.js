const { body } = require("express-validator");

const validationSchema = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 2, max: 30 })
            .withMessage("title not satisfied")
    ]
};

module.exports = {
    validationSchema
};