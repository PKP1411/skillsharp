const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursecontroller'); 


router.get('/all', courseController.select_all_course);

router.get('/:courseId', courseController.getAllModuleOfCourse);

router.get('/count', courseController.getAll);


module.exports = router;
