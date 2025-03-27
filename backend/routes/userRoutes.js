const express = require('express')
const { signupUser, loginUser } = require('../controllers/userController')
const requireAuth = require("../ middleware/requireAuth")

const router = express.Router()

// REQUIRE AUTH
router.use(requireAuth)

// SIGNUP route
router.post('/signup', signupUser)

// LOGIN route
router.post('/login', loginUser)

module.exports = router