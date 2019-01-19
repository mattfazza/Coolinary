const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//  Load Profile Model and User model
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//since we've already defined use in the server, we can just use /test as an endpoint

// @route GET api/posts/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

//  @route  GET api/profile
//  @desc   Get current user
//  @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'Theres no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;