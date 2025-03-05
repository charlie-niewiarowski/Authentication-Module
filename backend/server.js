require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/userRoutes')

// INITIALIZE app
const app = express()

// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use(userRoutes)

// LISTEN for requests
app.listen(process.env.PORT, () => {
    console.log('listening for requests on port: ', process.env.PORT)
})