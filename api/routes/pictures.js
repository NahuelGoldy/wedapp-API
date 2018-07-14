
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
const upload = multer({
    // storage: storage,
    storage: multer.memoryStorage(),
    limits: {
        // Max size = 5MB
        fileSize: 1024 * 1024 * 5
    }
});


// Create / upload one pic
router.post('/', upload.single('image'), (req, res, next) => {
    Pics.saveImage(req)
        .then(fb => {
            Pics.post(req, res, fb)
                .then(pic => {
                    res.json(pic);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get all pics
router.get('/', (req, res, next) => {
    Pics.findAll(req, res)
        .then(pics => {
            res.json(pics);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get all pics (with pagination)
router.get('/:pageNumb', (req, res, next) => {
    Pics.findAllPagination(req, res)
        .then(pics => {
            res.json(pics);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Like pic
router.post('/like', (req, res, next) => {
    Pics.like(req, res)
        .then(pic => {
            res.json(pic)
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete all pics (findAll + findOneAndRemove)
router.post('/delete', (req, res, next) => {
    Pics.findAll(req, res)
        .then(pics => {
            pics.forEach(p => {
                Pics.deleteOne(p._id, res)
                    .then(x => {
                        return x;
                    });
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;