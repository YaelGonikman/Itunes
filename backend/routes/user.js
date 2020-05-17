const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const mongoose = require('mongoose');
const User = require('../models/User');

// In case the user is in registration mode.
router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log(User);
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            console.log(user)
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            console.log(user)
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }

    });
});

// In case the user is in login mode.
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.post('/addSearch', (req, res) => {
    User.findOne({ email: req.body.user.email }, function (err, selectedUser) {
        if (!err) {
            req.body.value != "" ?
                selectedUser.searches.push(req.body.value)
                : null

            selectedUser.save(function (err) {
                if (!err) {
                    console.log("user " + req.body.user.email + " updated");
                }
                else {
                    console.log("Error: could not save user " + req.body.user.email);
                }

            });


        }
    });

})

router.post('/getTopTen', (req, res) => {
    User.findOne({ email: req.body.user.email }, function (err, selectedUser) {
        if (!err) {
            var arr = selectedUser.searches;
            console.log(arr)
            var counts = arr.reduce(function (map, search) {
                map[search] = (map[search] || 0) + 1;
                return map;
            }, {});

            var sorted = Object.keys(counts).sort(function (a, b) {
                return counts[b] - counts[a];
            });

            return res.json(sorted.slice(0, 10))
        }
    });

})

module.exports = router;