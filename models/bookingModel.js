const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    petowner:{
        type:String,
        reuired: true
    },
    pet:{
        type:String,
        required:true
    },
    message:{
        type: String,
        required:true
    }

}, {timestamps:true})

module.exports = mongoose.model('Booking', bookingSchema)
