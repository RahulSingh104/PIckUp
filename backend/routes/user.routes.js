const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('please enter a valid email'),
    body('fullname.firstName').isLength({min:3}).withMessage('first name must be at least 3 characters a long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters a Long'),
],userController.registerUser);

console.log('user routes loaded')


module.exports = router;