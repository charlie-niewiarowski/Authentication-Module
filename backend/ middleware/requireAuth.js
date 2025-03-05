const jwt = require('jsonwebtoken')
const identifyUser = require('../services/userService')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = identifyUser(_id) 
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

} 

module.exports = requireAuth