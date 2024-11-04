// /libs/multer.js
const multer = require('multer');

// Konfigurasi penyimpanan
const storage = multer.memoryStorage(); // Menyimpan file di memory

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

// Ekspor middleware multer
module.exports = upload;
