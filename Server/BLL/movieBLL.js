const movieModel = require('../models/moviesModel')

// - Get all movies
const getAllMovies = async () => {
    const movies = await movieModel.find()
    return movies
}

// - Get movie by id
const getMovieById = async (id) => {
    const movie = await movieModel.findById(id)
    return movie
}

// - Add movie
const addMovie = async (movie) => {
    const newMovie = await movieModel.create(movie)
    return newMovie
}

// - Update movie
const updateMovie = async (id, movie) => {
    const updatedMovie = await movieModel.findByIdAndUpdate(id, movie, { new: true })
    return updatedMovie
}

// - Delete movie
const deleteMovie = async (id) => {
    const deletedMovie = await movieModel.findByIdAndDelete(id)
    return deletedMovie
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}