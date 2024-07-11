const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

//  multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// 업로드 최대 10
router.post('/', upload.array('files', 10), (req, res) => {
    try {
        const fileNames = req.files.map(file => file.filename);
        res.status(201).json({ filenames: fileNames });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Image upload failed' });
    }
});

module.exports = router;
