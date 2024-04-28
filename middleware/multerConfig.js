const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const fileName = `image-${Date.now()}.${extension}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
        return cb(null, true);
    } else {
        return cb(new Error('This file must be an image'), false);
    }
}

const upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload;