// mentor.js

const express = require('express');
const router = express.Router();
const learnercontroller = require('../controllers/learnercontroller');

router.get('/upcoming-classes/:learnerId', learnercontroller.getAllUpcomingClassOfLearner);

router.get('/past-classes/:learnerId', learnercontroller.getAllPastClassOfLearner);


module.exports = router;
