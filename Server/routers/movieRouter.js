const router = require('express').Router()
const movieBLL = require('../BLL/movieBLL')
const subscriptionBLL = require('../BLL/subscriptionBLL')
const membersBLL = require('../BLL/membersBLL')

// - Get all movies with full details
router.get('/', async (req, res) => {
    const movies = await movieBLL.getAllMovies()
    const subscriptions = await subscriptionBLL.getSubscriptions()
    const members = await membersBLL.getAllMembers()

    // - Shape the movies array by find all movies with full details
    let shapeMovies = movies.map(movie => {
        return {
            _id: movie._id,
            name: movie.name,
            yearPremiered: movie.yearPremiered,
            genres: [...movie.genres],
            img: movie.img,
            subscriptions: [...subscriptions.filter(sub => sub.movieId == movie._id).map(sub => {
                return {
                    _id: sub._id,
                    movieId: sub.movieId,
                    member: members.find(member => member._id == sub.memberId),
                    date: sub.date,
                }
            })]
        }
    })

    res.status(200).json(shapeMovies)
})


// - Get one movie
router.get('/:id', async (req, res) => {
    const movie = await movieBLL.getMovieById(req.params.id)
    res.status(200).json(movie)
})

// - Add a movie
router.post('/', async (req, res) => {
    const movie = await movieBLL.addMovie(req.body)
    res.status(201).json(movie)
})

// - Update a movie
router.put('/:id', async (req, res) => {
    const movie = await movieBLL.updateMovie(req.params.id, req.body)
    res.status(200).json(movie)
})

// - Delete a movie
router.delete('/:id', async (req, res) => {
    const subscriptionDeleted = await subscriptionBLL.deleteAllSubscriptionsByMovieId(req.params.id)

    const movie = await movieBLL.deleteMovie(req.params.id)
    res.status(200).json(movie)
})

module.exports = router