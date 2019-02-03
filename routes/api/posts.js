const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


const Post = require('../../models/Post');
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
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    });

    newPost.save().then( Post => res.json(post));
});

module.exports = router;