const express = require('express')
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

// SIGNUP route
router.post('/', signupUser)

router.post('/', loginUser)

module.exports = router