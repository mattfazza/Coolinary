const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


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
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
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
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'User not found' });
            }

            //first we check to see if the user exists, if so, we
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({ msg: 'Success' });
                    } else {
                        return res.status(400).json({ password: 'Password is incorrect' });
                    }
                })

        })
})


module.exports = router;