// controllers/media.controllers.js
const path = require('path');
const fs = require('fs');

module.exports = {
    storageImage: async (req, res, next) => {
        console.log('File uploaded:', req.file);
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: false,
                    message: 'No image uploaded',
                });
            }

            // const imagesFolder = path.join(__dirname, '/uploads');
            // if (!fs.existsSync(imagesFolder)) {
            //     fs.mkdirSync(imagesFolder, { recursive: true });
            // }

            // const imagePath = path.join(imagesFolder, req.file.filename);
            // fs.writeFileSync(imagePath, req.file.buffer);

            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            res.status(200).json({
                status: true,
                message: 'Image uploaded successfully',
                data: {
                    imageUrl: imageUrl,
                },
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
};

