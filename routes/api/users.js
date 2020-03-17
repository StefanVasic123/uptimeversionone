const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model (to find, save)
const User = require('../../models/User');

// @route PUT api/users/update

// @desc Update items data

// @access Public

router.post('/update', (req, res) => {
    User.findOneAndUpdate({ _id: req.body.id }, 
    { $set: {
        items: req.body.items
    }},
     (err, result) => {
        if(err) return res.send(err)
        res.send(result)
      })
}) 

router.get('/get', (req, res) => {
    User.findById({_id: localStorage.getItem('userId')})
        .then(res => res.params(req))
})
/*router.post('/update', (req, res) => {
    Item.findOneAndUpdate({ _id: req.body._id },
      { $set: {
        items: req.body.items
      }}, (err, result) => {
        if(err) return res.send(err)
        res.send(result)
      })
  }) */

// @route   POST api/users

// @desc    Register new user

// @access  Public

router.post('/', (req, res) => {
    const { name, email, password, items } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ ms: 'Please enter all fields '})
    }

    // Checking for existing user
    User.findOne( { email } )
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exist' })

            const newUser = new User({
                name,
                email,
                password,
                items
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 }, // When expire 1 hour
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            items: user.items
                                        }
                                    })
                                }
                            )   
                        })
                })
            })
        })
})

// @route PUT api/users

// @desc change items value

module.exports = router;