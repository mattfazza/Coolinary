const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//  Post model
const Post = require('../../models/Post');
//  Profile model
const Profile = require('../../models/Profile');

//  Brin.ging in Validation
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

// @route GET api/posts
// @desc GET posts route
// @access Public
router.get('/', (req, res) => {
    Posts.find()
    .sort({date: -1})
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that id'}))
});

// @route GET api/posts/:id
// @desc GET specific post
// @access Public
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that id'}))
});

//  @route DELETE api/posts:id
//  @desc Delete post
//  @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            //  Check for post owner
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({ notauthorized: 'User not authorized'});
            }

            //  Delete
            post.remove().then( () => res.json( { success: true } ));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found '}));
    })   
});

//  @route POST api/posts/like/:id
//  @desc Like post
//  @access Protected
router.post('like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(post => {
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ alreadyliked: 'User already liked this post' });
        }

        //  Add user id to posts array
        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post()));
    })
        .catch(err => res.status(404).json({ postnotfound: 'No post found '}));   
});

module.exports = router;