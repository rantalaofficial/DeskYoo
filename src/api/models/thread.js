const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    text: String,
    likes: Number,
    location: String,
    color: Number,
    author: mongoose.Schema.Types.ObjectId,
    parentId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Thread", threadSchema);
