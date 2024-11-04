//imagekit
// const router = require("express").Router();
// const { uploadImage } = require("../../../controllers/imagekit.controller");
// const imagekit = require("../../../libs/imagekit");


// router.post("/upload", upload.single("image"), uploadImage);


// const express = require("express");
// const router = express.Router();
// const upload = require("../libs/imagekit");
// const { uploadImage } = require("../controllers/imagekit.controller");

// router.post("/upload", upload.single("image"), uploadImage);


// module.exports = router;




// const { uploadImage } = require("./controllers/imagekit.controller");
// app.post('/upload', upload.single('image'), uploadImage)

// /routes/imagekit.js
const router = require("express").Router();
const upload = require("../libs/upload");
const { imagekitUpload } = require("../controllers/imagekit.controller"); // Ganti dengan nama yang benar

router.post("/images", upload.single("image"), imagekitUpload); // Gunakan imagekitUpload di sini

module.exports = router;
