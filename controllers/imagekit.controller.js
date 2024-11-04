// /controllers/imagekit.controller.js
const imagekit = require("../libs/imagekit");

const imagekitUpload = async (req, res) => {
    try {
        const stringFile = req.file.buffer.toString('base64');

        const uploadFile = await imagekit.upload({
            fileName: req.file.originalname,
            file: stringFile,
        });

        res.status(200).json({
            status: true,
            data: {
                name: uploadFile.name,
                url: uploadFile.url,
                type: uploadFile.type
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

// Pastikan untuk mengekspor fungsi ini
module.exports = {
    imagekitUpload
};
