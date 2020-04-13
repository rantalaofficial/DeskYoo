const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    text: String,
    likes: Number,
    threadId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Answer", answerSchema);
