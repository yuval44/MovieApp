const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    movieId: String,
    memberId : String,
    date : String
})

module.exports = mongoose.model('subscription', SubscriptionSchema);