// mentor.js

const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modulecontroller');

router.get('/module/:id', moduleController.getModuleById);
router.get('/home', moduleController.getHomePage);
router.get('/module/:id/prerequisite', moduleController.getprerequisitesOfModule);
router.get('/module/:moduleId/skill', moduleController.getSkillofmodule);
router.get('/', moduleController.getAllModules)
router.patch('/:moduleId',moduleController.patchModuleById);

module.exports = router;


 
 

