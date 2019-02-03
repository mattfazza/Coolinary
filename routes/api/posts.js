const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//  Post model
const Post = require('../../models/Post');

//  Validation
const validatePostInput = require('../../validation/post');

//since we've already defined use in the server, we can just use /test as an endpoint

//To do: work on the routes for posting, deleting posts, liking posts, etc.

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

// @route POST api/posts/
// @desc Create posts
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { 

    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
        //  if any errors, send 400 with errors object
        return res.status(400).jsone(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then( Post => res.json(post));
});

module.exports = router;