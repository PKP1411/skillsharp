const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentor');

// Place more specific routes before more general ones
router.get('/:mentorId', mentorController.getMentorById);
router.get('/:profileType', mentorController.getUsersByProfileType);
router.get('/', mentorController.getHomePage);

module.exports = router;
