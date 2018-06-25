
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: String,
    author: String,
    isPublic: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', userSchema);