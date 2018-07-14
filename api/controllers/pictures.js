
const mongoose = require('mongoose');
const Pic = new require('../models/picture');
const request = require('request');
const config = require('./api/config/config');

// TODO review "batch" size
const batchSize = 12;

// create and save a pic
exports.post = (req, res, fb) => {
    const data = req.body;
    const fb_response = JSON.parse(fb);

    return Pic.create({
        _id: mongoose.Types.ObjectId(),
        path: config.firebase.url_download + fb_response.bucket + '/o/' + fb_response.name + '?alt=media&token=' + fb_response.downloadTokens,
        isPublic: data.isPublic
    })
        .then(pic => {
            return pic;
        })
        .catch(err => {
            return err;
        });
};

// return all Pics
exports.findAll = (req, res) => {
    return Pic.find({isPublic: true})
        .then(pics => {
            return pics;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// return all Pics
exports.findAllPagination = (req, res) => {
    const skip = batchSize * (req.params.pageNumb - 1);
    const sort = { createdAt: -1 };
    let query = {};
    query.skip = skip;
    query.limit = batchSize;
    query.sort = sort;

    return Pic.find({isPublic: true}, {}, query)
        .then(pics => {
            return pics;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// Find and update likeCount of a given Pic
exports.like = (req, res) => {
    let query = {};
    query.$inc = {'likesCount': 1};

    return Pic.findOneAndUpdate({_id: req.body._id}, query, {new: true})
        .then(pic => {
            return pic;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// Delete all
exports.deleteOne = (id, res) => {
    return Pic.findOneAndRemove({_id: id}).exec()
        .then(pics => {
            return pics;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// Save image to Firebase
exports.saveImage = (req) => {
    const img = req.file;
    const img_name = (new Date().toISOString().split('.')[0]).replace(/:/g, '.') + '.' + req.file.originalname.split('.').pop();
    const firebase_url = config.firebase.url_upload + img_name;
    const formData = {
        image: {
            value: img.buffer,
            options: {
                filename: img_name
            }
        }
    };
    const options = {
        uri: firebase_url,
        formData: formData,
        method: 'POST'
    };

    return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) {
                console.log('Request err: ', err);
                reject(err);
            } // TODO improve error handling (retry strategy?)
            resolve(body);
        });
    });
};