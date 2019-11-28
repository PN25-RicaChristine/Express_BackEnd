const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../model/User');
const key = require('../../config/keys').secret;


/**
 * @route POST api/users/register
 * @description Register user
 * @access Public
 */

router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirmPassword,
        userType,
        address
    } = req.body
    if (password !== confirmPassword) {
        return res.send('Password do not match!');
    }
    else {
        User.findOne({ username: username }).then(user => {
            if (user) {
                return res.send('Username is already taken.');
            } else {
                User.findOne({ email: email }).then(user => {
                    if (user) {
                        return res.send('Email is already taken.');
                    } else {
                        let newUser = new User({
                            name: name,
                            username: username,
                            address: address,
                            email: email,
                            password: password,
                            userType: userType
                        })

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) {
                                    throw err;
                                } else {
                                    newUser.password = hash;
                                    newUser.save().then(user => {
                                        res.send('You are now registered!');
                                        console.log("Successfully Registered.");
                                    });
                                }
                            })

                        })
                    }


                });




            }
        })
    }



});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.send('Account not found!')
        } else {
            bcrypt.compare(req.body.password, user.password).then(match => {
                if (match) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        userType: user.userType,
                        address: user.address
                    }
                    jwt.sign(payload, key, {
                        expiresIn: 604800
                    }, (err, token) => {
                        if (err) {
                            res.status(400).json({
                                msg: "Error!",
                                success: false
                            });
                        } else {
                            console.log("Successfully Login.");
                            return res.send("Succesfully log in!");
                            
                        }
                    });
                } else {
                    return res.send("Password is incorrect!");
                }
            });
        }
    })
});

router.get('/profile', passport.authenticate('jwt',
    {
        session: false
    }), (req, res) => {
        return res.json({
            user: req.user
        });
    }

);

module.exports = router;

