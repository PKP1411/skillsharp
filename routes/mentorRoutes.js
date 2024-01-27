// mentor.js

const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorcontroller');
 

router.get('/mentor/:mentorId', mentorController.getMentorById);

router.get('/home', mentorController.getHomePage);

router.get('/count', mentorController.getCountOfMentor);

router.get('/upcoming-classes/:mentorId', mentorController.getUpcomingClassOfMentor);

router.get('/past-classes/:mentorId',  mentorController.getPastClassOfMentor);

router.get('/all', mentorController.getAllMentors);

router.get('/getMentorsAvailableAtTime', mentorController.getMentorsAvailableAtTime);

router.get('/getAllMentorAvailability', mentorController.getAllMentorAvailability);
 


// how to update mentor with as well  userprofile
// router.patch('/mentor/:id', mentorController.patchMentorById);


// GET all upcoming classes of a mentor by ID
// router.get('/:mentorId/upcoming-classes', mentorController.getAvailableMentorForModule);

module.exports = router;
