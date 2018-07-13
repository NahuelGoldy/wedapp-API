
const mongoose = require('mongoose');
const Pic = new require('../models/picture');
const request = require('request');
const axios = require('axios');

// TODO review "batch" size
const batchSize = 12;

// create and save a pic
exports.post = (req, res) => {
    const data = req.body;
    const img = req.file;
    const img_name = (new Date().toISOString().split('.')[0]).replace(/:/g, '.') + '.' + req.file.originalname.split('.').pop();

    const firebase_url = 'https://firebasestorage.googleapis.com/v0/b/wedapp-1529785854543.appspot.com/o?uploadType=media&name=' + img_name;
    let fb_base_download_url = 'https://firebasestorage.googleapis.com/v0/b/';
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

    // let fb_response = {};
    // Send POST to Firebase storage to save just the image
    // request(options, (err, response, body) => {
    //     if (err) console.log('Request err: ', err); // TODO improve error handling (retry strategy?)
    //     fb_response = JSON.parse(body);
    // });

    return axios.post(options.uri, options.formData)
        .then(response => {
            // console.log(response.data);
            const fb_response = response.data;

            Pic.create({
                _id: mongoose.Types.ObjectId(),
                path: fb_base_download_url + response.data.bucket + '/o/' + response.data.name + '?alt=media&token=' + response.data.downloadTokens,
                isPublic: data.isPublic
            })
                .then(pic => {
                    return pic;
                })
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