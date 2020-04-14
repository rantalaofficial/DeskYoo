const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: String,
    likes: Number,
    location: String,
    author: mongoose.Schema.Types.ObjectId,
    parentId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Answer", answerSchema);
