

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course'); 


router.get('/', courseController.select_all_course);
router.get('/:courseId/modules', courseController.getAllModuleOfCourse); 


// router.get('/:courseId', mentorController.getC);


module.exports = router;
