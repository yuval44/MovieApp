const router = require('express').Router();
const subscriptionBLL = require('../BLL/subscriptionBLL');
const movieBLL = require('../BLL/movieBLL')
const membersBLL = require('../BLL/membersBLL')

// - Get all subscriptions
router.get('/', async (req, res) => {
    const subscriptions = await subscriptionBLL.getSubscriptions()
    const movies = await movieBLL.getAllMovies()
    const members = await membersBLL.getAllMembers()
    
    let shapedSubMembers = members.map(member => {
        return {
            _id: member._id,
            fullname: member.fullname,
            email: member.email,
            city: member.city,
            movies: subscriptions.filter(sub => sub.memberId == member._id).map(sub =>{
                return {
                    id: sub._id,
                    date: sub.date,
                    movie: movies.find(movie => movie._id == sub.movieId),
                }
            }),
        }
    })

    res.status(200).json(shapedSubMembers)
})

// - Get a subscription
router.get('/:id', async (req, res) => {
    const subscription = await subscriptionBLL.getSubscriptionById(req.params.id);
    res.status(200).json(subscription)
})

// - Get all subscriptions by movie id
router.get('/movie/:id', async (req, res) => {
    const subscriptions = await subscriptionBLL.getSubscriptionsByMovieId(req.params.id);
    res.status(200).json(subscriptions)
})


// - Create a subscription
router.post('/', async (req, res) => {
    // - Validate the data from the request
    if (!req.body.memberId) {
        res.status(400).json({ message: 'Member id is required' })
        return
    }
    if (!req.body.movieId) {
        res.status(400).json({ message: 'Movie id is required' })
        return
    }
    if (!req.body.date) {
        res.status(400).json({ message: 'Date is required' })
        return
    }

    const subscription = await subscriptionBLL.createSubscription(req.body);
    res.status(201).json(subscription)
})

// - Update a subscription
router.put('/:id', async (req, res) => {
    const subscription = await subscriptionBLL.updateSubscription(req.params.id, req.body);
    res.status(200).json(subscription)
})

// - Delete a subscription
router.delete('/:id', async (req, res) => {
    const subscription = await subscriptionBLL.deleteSubscription(req.params.id);
    res.status(200).json(subscription)
})

module.exports = router;

