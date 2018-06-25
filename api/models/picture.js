
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    path: String,
    likesCount: Number,
    isPublic: Boolean,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Picture', userSchema);