const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => { 
        let ext = file.originalname.split(".");
        ext = ext[ext.length - 1];
        cb(null, `${Date.now()}.${ext}`);
     }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) 
            cb(null, true);
    },
});

router.post("/", upload.single("file"), (req, res) => {
    res.status(200).json(req.file);
  });

/*
router.post('/', upload.array("file"), (req, res) => {
    try {
        res.status(200).json(req.file);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Image upload failed' });
    }
});*/

module.exports = router;
