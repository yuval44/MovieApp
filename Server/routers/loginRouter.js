const router = require('express').Router()
const userBLL = require('../BLL/usersBLL')

const jwt = require("jsonwebtoken")

const RSA_PRIVATE_KEY = "1dfhytkr6$^a4whJj4s^%Jj6ss6r4w%$Her5r45a!"
const expiresInValue = 60 * 10 // Token expires in 10 minutes


// - Login
router.post('/', async (req, res) => {

    const { username, password } = req.body
    const user = await userBLL.getUserByUsernameAndPassword(username, password)

    // --- [Token] , if user exists get new token and return the token
    if (user) {
        const token = jwt.sign({ id: user.id }, RSA_PRIVATE_KEY, { expiresIn: expiresInValue })
        return res.status(200).json({ token })
    }

    return res.status(401).json({ message: "Invalid Credentials" })
})


// - check user token and return user data
router.get('/', async (req, res) => {
    const token = req.headers["token"]
    
    // - Check if token is exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    
    // - Check if token is valid
    try {
        // - Decode token
        const decoded = jwt.verify(token, RSA_PRIVATE_KEY)
        
        // - Find user by id
        const user = await userBLL.getUserById(decoded.id)

        // - Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // - Return user data if token is valid, and create new token
        let newToken = jwt.sign({ id: user.id }, RSA_PRIVATE_KEY, { expiresIn: expiresInValue })
        return res.status(200).json({ message: 'OK token',token: newToken , userFullName: user.fullname })

    } catch (error) {
        // - Return error if token is invalid
        return res.status(401).json({ message: 'Invalid token', error })
    }
})



module.exports = router