// routes/media.routes.js
const router = require("express").Router();
const image = require("../../../libs/multer"); // instance multer untuk gambar
const { storageImage } = require("../../../controllers/media.controllers");

router.post("/images", image.single("image"), storageImage);

module.exports = router;
