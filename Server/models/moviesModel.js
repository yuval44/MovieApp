const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name: String,
    yearPremiered : Number,
    genres : [],
    img : String
})

module.exports = mongoose.model('movie', MovieSchema);