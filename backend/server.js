require('dotenv').config()
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors")

// INITIALIZE app
const app = express()

// MIDDLEWARE
app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use('/api/user/', userRoutes)

// LISTEN for requests
app.listen(process.env.PORT, () => {
    console.log('listening for requests on port: ', process.env.PORT)
})