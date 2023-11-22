// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads'); // Folder to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Example endpoint to handle file upload
router.post('/', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imageUrl = `${file.filename}`; // Assuming 'uploads' is the folder in your assets
    res.json({ imageUrl });
});

module.exports = router;
