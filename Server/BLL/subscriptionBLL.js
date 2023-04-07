const subscriptionModel = require('../models/subscriptionsModel')


// - Get subscription
const getSubscriptions = async () => {
    const subscription = await subscriptionModel.find({})
    return subscription
}

// - Get subscription by id
const getSubscriptionById = async (id) => {
    const subscription = await subscriptionModel.findById(id)
    return subscription
}

// - Get subscription by movie id
const getSubscriptionsByMovieId = async (movieId) => {
    const subscription = await subscriptionModel.find({ movieId })
    return subscription
}

// - Create subscription
const createSubscription = async (subscription) => {
    const subscriptionCreated = await subscriptionModel.create(subscription)
    return subscriptionCreated
}

// - Update subscription
const updateSubscription = async (id, subscription) => {
    const subscriptionUpdated = await subscriptionModel.findByIdAndUpdate(id, subscription, { new: true })
    return subscriptionUpdated
}

// - Delete subscription
const deleteSubscription = async (id) => {
    const subscriptionDeleted = await subscriptionModel.findByIdAndDelete(id)
    return subscriptionDeleted
}

// - Delete all subscriptions by member id
const deleteAllSubscriptionsByMemberId = async (memberId) => {
    const subscriptionDeleted = await subscriptionModel.deleteMany({ memberId })
    return subscriptionDeleted
}

// - Delete all subscriptions by movie id
const deleteAllSubscriptionsByMovieId = async (movieId) => {
    const subscriptionDeleted = await subscriptionModel.deleteMany({ movieId })
    return subscriptionDeleted
}


module.exports = {
    getSubscriptions,
    getSubscriptionById,
    getSubscriptionsByMovieId,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    deleteAllSubscriptionsByMemberId,
    deleteAllSubscriptionsByMovieId
}