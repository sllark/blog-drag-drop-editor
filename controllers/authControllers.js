const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config/keys')
const User = require('../models/User');


exports.postLogin = (req, res, next) => {

    let fetchedUser;
    const {email, password} = req.body;

    User.findOne({email: email})
        .then((user) => {

            console.log(user);

            fetchedUser = user;
            return bcrypt.compare(password, user.password)

        })
        .then((isEqual) => {


            if (!isEqual) {
                const error = new Error('Email or Password does not match.');
                error.statusCode = 401;
                error.errors = validation.array();
                throw error;
            }


            let payload = {
                email,
                userID: fetchedUser._id.toString()
            }

            jwt.sign(payload, JWT_SECRET, (error, token) => {
                if (error) throw new Error('internal Error');

                res.status(200).json({token: token, userID: fetchedUser._id.toString()});

            });


        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })


}


exports.postSignup = (req, res, next) => {


    const {firstName,lastName,email, password} = req.body;

    bcrypt.hash(password, 12)
        .then((hashedPass) => {


            let newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPass,

            });
            newUser.save()
                .then(result => {


                    let payload = {
                        email,
                        userID: result._id.toString()
                    }


                    jwt.sign(payload, JWT_SECRET, (error, token) => {
                        if (error) throw new Error('internal Error');

                        res.status(200)
                            .json({
                                'message': "success",
                                token: token,
                                userID: result._id.toString(),
                            });
                    })

                })
                .catch(err => {
                    if (!err.statusCode)
                        err.statusCode = 500;
                    next(err);
                })

        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })


}