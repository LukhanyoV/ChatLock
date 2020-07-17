const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Blog = require('../models/Blog');

// @route       GET blog/
// @desc        Get all user posts
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Blog.find().sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST blog/
// @desc        Add new post
// @access      Private
router.post('/', [auth, [
    check('message', 'Message is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    // Two lines of code to get the username by id
    let getName = await User.findById(req.user.id).select('name');
    let name = getName.name;

    const {message} = req.body;

    try {
        const newPost = new Blog({
            name,
            message,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT blog/:id
// @desc        Update user post
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const {message} = req.body;

    // Build blog object
    const postFields = {};

    if(message) postFields.message = message;

    try {
        let post = await Blog.findById(req.params.id);

        if(!post) return res.status(404).json({msg: 'Post not found'});

        // Make sure user owns post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }

        post = await Blog.findByIdAndUpdate(req.params.id, 
            { $set: postFields},
            { new: true}
        );

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       DELETE blog/:id
// @desc        Delete user post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Blog.findById(req.params.id);

        if(!post) return res.status(404).json({msg: 'Post not found'});

        // Make sure user owns post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Blog.findByIdAndRemove(req.params.id);

        res.json({msg: 'Post removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;