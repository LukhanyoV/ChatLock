const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST register/
// @desc        Register a user
// @access      Public
router.post('/', [
    check('name', 'Name must not be empty')
        .not()
        .isEmpty(),
    check('email', 'Email must be valid')
        .isEmail(),
    check('password', 'Password length must be at least 6 characters long')
        .isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exist'})
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever error');       
    }

});

module.exports = router;