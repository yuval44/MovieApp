const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
})

module.exports = mongoose.model('user', UserSchema);