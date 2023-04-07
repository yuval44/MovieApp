const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    city : String,
})

module.exports = mongoose.model('member', MemberSchema);