const express = require('express')
const router = express.Router()
const User = require('../models/user')
//Get Login
router.get('/login', (req, res, next) => {
    res.send("I am login")
})

//New Registration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err, user) =>{
        if(err) {
            return res.send({
                success: false,
                message: 'Failed to save the user'
            })
        }
        res.send({
            success: true,
            message: 'User saved!',
            user // user == user: user
        })
    })
})

module.exports = router