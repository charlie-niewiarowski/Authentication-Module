const registerUser = require('../services/userService')
const authenticateUser = require('../services/authService')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, { expiresIn: '2d' })
}


const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || ! email || !password) {
        return res.status(400).json({ erorr: "username, email, and password are required fields"})
    }

    try {
        const user = await registerUser(username, email, password)
        const token = await createToken(user)
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { identifier, password } = req.body

    if (!identifier) {
        return res.status(400).json({ error: "Username/Email field must be filled"}
        )
    }
    
    if (!password) {
        return res.status(400).json({ error: "Password field must be filled"})
    }

    try {
        user = await authenticateUser(identifier, password)
        const token = await createToken(user)
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { signupUser, loginUser }

