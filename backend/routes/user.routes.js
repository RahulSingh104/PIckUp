const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

route.post('/register',[
    body('email').isEmail().withMessage('please enter a valid email'),
    body('fullname.firstName').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
])




module.exports = router;