const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    passwordHash: Number,
    score: Number,
    loggedSocketID: String,
})

module.exports = mongoose.model("User", userSchema);
