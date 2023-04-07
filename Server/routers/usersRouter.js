const router = require('express').Router()
const userBLL = require('../BLL/usersBLL')


// - GET all users
router.get('/', async (req, res) => {
    const users = await userBLL.getUsers()
    res.status(200).json(users)
})

// - GET user by id
router.get('/:id', async (req, res) => {
    const user = await userBLL.getUserById(req.params.id)
    res.status(200).json({
        _id: user._id,
        fullname: user.fullname
    })
})

// - POST new user
router.post('/', async (req, res) => {
    const newUser = await userBLL.createUser(req.body)
    res.status(201).json({
        id: newUser._id,
    })
})

// - UPDATE user by id
router.put('/:id', async (req, res) => {
    const updatedUser = await userBLL.updateUser(req.params.id, req.body)
    res.status(200).json({
        id: updatedUser._id,
    })
})

// - DELETE user by id
router.delete('/:id', async (req, res) => {
    const deletedUser = await userBLL.deleteUser(req.params.id)
    res.status(200).json({
        message: `User ${deletedUser._id} Deleted`,
    })
})

module.exports = router