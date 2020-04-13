const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    text: String,
    followers: Number,
});

module.exports = mongoose.model("Channel", channelSchema);
