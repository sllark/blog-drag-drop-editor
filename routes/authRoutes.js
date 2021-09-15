const express = require('express');
const {body} = require('express-validator');

const User = require('../models/User');

const authControllers = require('../controllers/authControllers')


const router = express.Router();


router.post('/signup',
    [
        body('email').isEmail().withMessage("Please enter a Valid Email").custom((value, {req}) => {

            return User.findOne({email: value}).then((result) => {
                if (result)
                    return Promise.reject("Email already exists.");
                return true;
            })

        }),
        body('password','Password is too short.').not().isEmpty().isLength({min: 5}),
        body('firstName').not().isEmpty().isLength({min: 1}).withMessage('First Name not found.'),
        body('lastName').not().isEmpty().isLength({min: 1}).withMessage('Last Name not found.')
    ],
    authControllers.postSignup);




router.post('/login',
    [
        body('email').isEmail().withMessage("Please enter a Valid Email").custom((value, {req}) => {

            return User.findOne({email: value}).then((result) => {
                if (!result)
                    return Promise.reject("No User found.");
                return true;
            })

        }),
        body('password','Password is too short.').not().isEmpty().isLength({min: 5})
    ],
    authControllers.postLogin);



module.exports = router;