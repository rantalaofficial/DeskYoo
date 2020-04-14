const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    passwordHash: Number,
    score: Number,
})

module.exports = mongoose.model("User", userSchema);
