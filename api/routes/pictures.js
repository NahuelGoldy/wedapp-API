
const express = require('express');
const router = express.Router();
const Pics = require('../controllers/pictures');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const filenm = (new Date().toISOString().split('.')[0]).replace(/:/g, '.') + '.' + file.originalname.split('.')[1];
        cb(null, filenm);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept file
        cb(null, true);
    } else {
        // reject file
        cb(null, false);
    }
};
const upload = multer({storage: storage, limits: {
    // Max size = 5MB
    fileSize: 1024 * 1024 * 5
}});


// Create / upload one pic
// router.post('/', upload.single('image'), (req, res, next) => {
//     Pics.post(req, res)
//         .then(pic => {
//             res.json(pic);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });

// Get all pics
// router.get('/', (req, res, next) => {
//     Pics.findAll(req, res)
//         .then(pics => {
//             res.json(pics);
//         })
//         .catch(err => {
//             res.status(500).send(err);
//         });
// });

module.exports = router;