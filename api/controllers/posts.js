
const mongoose = require('mongoose')
const Post = new require('../models/post');

// TODO review "batch" size
const batchSize = 10;

// create a Post
exports.post = (req, res) => {
    const data = req.body ;

    return Post.create({
        _id: mongoose.Types.ObjectId(),
        message: data.message,
        author: data.author,
        isPublic: data.isPublic
    })
        .then(post => {
            return post;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// return all Posts (with server-side pagination)
exports.findAll = (req, res) => {
    return Post.find()
        .then(posts => {
            return posts;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// return all Posts (with server-side pagination)
exports.findAllPagination = (req, res) => {
    const skip = batchSize *(req.params.pageNum - 1);
    const sort = { createdAt: -1 };
    let query = {};
    query.skip = skip;
    query.limit = batchSize;
    query.sort = sort;

    return Post.find({}, {}, query)
        .then(posts => {
            return posts;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

// return a Post by its ID
exports.findOne = (req, res) => {
    return Post.findOne({ _id: req.params.id })
        .exec()
        .then(post => {
            return post;
        })
        .catch(err => {
            res.status(500).send(err);
        });
};