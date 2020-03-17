const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model (to find, save)
const User = require('../../models/User');

// @route   POST api/auth

// @desc    Auth user

// @access  Public

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ ms: 'Please enter all fields '})
    }

    // Checking for existing user
    User.findOne( { email } )
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' })

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})

// @route   GET api/auth/user

// @desc    Get user data

// @access  Public
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})
/*router.put('/update', auth, (req, res) => {
    Item.findOneAndUpdate({ _id: `"${this.state.userId}"` },
    { $set: {
      items: req.body.items
    }}, (err, result) => {
      if(err) return res.send(err)
      res.send(result)
    })
}) */
router.post('/update', (req, res) => {
    Item.findOneAndUpdate({ _id: req.body.id },
      { $set: {
        items: req.body.items
      }}, (err, result) => {
        if(err) return res.send(err)
        res.send(result)
      })
  })

module.exports = router;