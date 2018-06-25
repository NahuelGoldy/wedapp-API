
const mongoose = require('mongoose')
const Post = new require('../models/post');

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

// return all Posts
exports.findAll = (req, res) => {
    return Post.find()
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