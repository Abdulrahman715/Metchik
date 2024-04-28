const uploadImage = require('../models/uploadImage.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');



const createuploadImage = asyncWrapper(async (req, res, next) => {
    const { productId } = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
            return next(error);
    }
    
    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;
        
    const newImage = new uploadImage({
        image: url,
    });
    
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newImage,
        },
    });
});


module.exports = {
    createuploadImage,
}


