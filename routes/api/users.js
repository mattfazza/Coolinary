const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

//  Load Login Validation
const validateLoginInput = require("../../validation/login");

//load user model
const User = require('../../models/User');

//since we've already defined use in the server, we can just use /test as an endpoint
//we'll actually input /api/users/test to test this

// @route GET api/posts/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/posts/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    //req.body has everything that's in this route
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'A user with that email already exists'
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                //we're are providin a user, an email, and a password and that user is sent back to us in the response
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });

});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {

    //req.body has everything that's in this route
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //first we check to see if the user exists, if so, we
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //user matched

                        //create jwt payload as a js object
                        const payload = { id: user.id, name: user.name, avatar: user.avatar }

                        //sign token
                        //this is gonna take a payload which is what we wanna include in the token
                        //it also takes a key from keys.js
                        //after an hour the key is thrown out and the user needs to log in again
                        jwt.sign(payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            })
                    } else {
                        errors.password = 'Password incorrect'
                        return res.status(400).json(errors);
                    }
                })

        })
})


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name
    })
});


module.exports = router;