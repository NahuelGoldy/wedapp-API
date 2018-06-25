
const express = require('express');
const router = express.Router();
const Post = require('../controllers/posts');

router.get('/', (req, res, next) => {
    Post.findAll(req, res)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/:id', (req, res, next) => {
    Post.findOne(req, res)
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;