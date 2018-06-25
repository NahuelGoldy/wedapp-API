
const mongoose = require('mongoose')
const Pic = new require('../models/picture');

// create and save a pic
exports.post = (req, res) => {
    const data = req.body ;

    return Pic.create({
        _id: mongoose.Types.ObjectId(),
        path: req.file.path,
        isPublic: data.isPublic
    })
        .then(post => {
            return post;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// return all Pics
exports.findAll = (req, res) => {
    return Pic.find()
        .then(pics => {
            return pics;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};