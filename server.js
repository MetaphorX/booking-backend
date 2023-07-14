require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const mongoose = require('mongoose')
const bookingRoutes = require('./routes/bookings')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/bookings',bookingRoutes)
app.use('/api/user', userRoutes)
//connecting DB
mongoose.connect(process.env.MONGO_LOCAL)
    .then(() =>{
        app.listen(4000, () =>{
            console.log(`Database connected & listening on port ${port}`)
        })
        
    })
    .catch((error) =>{
        console.log(error)
    })


