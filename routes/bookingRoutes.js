// mentor.js

const express = require('express');
const router = express.Router();
const learnerBookingController = require('../controllers/bookingConrtoller');


router.get('', learnerBookingController.getAllLearnerBookings);


router.get('/bookingId', learnerBookingController.getLearnerBookingById);


router.post('/book', learnerBookingController.createLearnerBooking);


router.patch('/:bookingId', learnerBookingController.updateLearnerBooking);


router.delete('/:bookingId', learnerBookingController.deleteLearnerBooking);


router.get('/past', learnerBookingController.getPastBookingHistory);


router.get('/upcoming', learnerBookingController.getUpcomingBookingClasses);




module.exports = router;
