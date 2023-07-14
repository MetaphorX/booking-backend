const express = require('express')

const router = express.Router()
const {
    createBooking,
    getBooking,
    getBookings,
    deleteBooking,
    updateBooking

} = require('../controllers/bookingController')

//get all bookings
router.get('/', getBookings)

//get single booking
router.get('/:id', getBooking)

//create new booking
router.post('/', createBooking)

//delete booking
router.delete('/:id', deleteBooking)

// update booking
router.patch('/:id', updateBooking)

module.exports = router