const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
    text: String,
    likes: Number,
    channelId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Thread", threadSchema);
