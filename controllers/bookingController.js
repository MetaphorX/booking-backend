const mongoose = require('mongoose')
const Booking = require('../models/bookingModel')

//Get bookings
const getBookings = async(req, res) =>{
    const bookings = await Booking.find({}).sort({createdAt: -1})
    res.status(200).json(bookings)
}


//Get Single Booking

const getBooking = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Booking not found'})
    }
    const booking = await Booking.findById(id)

    if(!booking){
        return res.status(404).json({error: 'Booking not Found'})
    }

    res.status(200).json(booking)
}
 
//Create new Booking
const createBooking = async(req, res) =>{
    const {title, email, petowner,pet,message} = req.body

    // checking for empty fields
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!petowner){
        emptyFields.push('petowner')
    }
    if(!pet){
        emptyFields.push('pet')
    }
    if(!message){
        emptyFields.push('message')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill all the fields', emptyFields})
    }
    //adding doc to DB
    try {
        const booking = await Booking.create({
            title,email,petowner,pet,message
        })
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete Booking
const deleteBooking = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'Booking not Found'})
    }
    const booking = await Booking.findOneAndDelete({_id:id})
    
    if(!booking){
        return res.status(404).json({error:"booking not found"})
    }

    res.status(200).json(booking)
}

//Update Booking
const updateBooking = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Booking not found'})
    }

    const booking = await Booking.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    if(!booking){
        return res.status(404).json({error:'Booking not found'})
    }
    res.status(200).json(booking)

}


module.exports ={
    createBooking,
    getBooking,
    getBookings,
    deleteBooking,
    updateBooking
}