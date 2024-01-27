// mentor.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


 


router.post('/createUser', userController.createNewUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.patch('/:id', userController.patchUserById);
router.get('/profile/:profileType', userController.getUsersByProfileType);







module.exports = router;
