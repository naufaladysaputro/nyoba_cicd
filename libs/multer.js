// libs/multer.js
const multer = require('multer');
const path = require('path');

const filename = (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
};

const generatorStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename
    });
};

// Export instance multer sesuai dengan konfigurasi penyimpanan untuk gambar
const image = multer({
    storage: generatorStorage('./uploads'),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload!`);
            cb(err, false);
        }
    },
});

module.exports = image;
