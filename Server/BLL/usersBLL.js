const usersModel = require('../models/usersModel')

// - Get all users
const getUsers = async () => {
    const users = await usersModel.find({})
    return users
}

// - Get user by id
const getUserById = async (id) => {
    const user = await usersModel.findById(id)
    return user
}

// - Get user by username and password
const getUserByUsernameAndPassword = async (username, password) => {
    const user = await usersModel.findOne({ username: username, password: password })
    return user
}

// - Create user
const createUser = async (user) => {
    return await usersModel.create(user)
}

// - Update user
const updateUser = async (id, user) => {
    const updatedUser = await usersModel.findByIdAndUpdate(id, user)
    return updatedUser
}

// - Delete user
const deleteUser = async (id) => {
    const deletedUser = await usersModel.findByIdAndDelete(id)
    return deletedUser
}


module.exports = {
    getUsers,
    getUserById,
    getUserByUsernameAndPassword,
    createUser,
    updateUser,
    deleteUser
}