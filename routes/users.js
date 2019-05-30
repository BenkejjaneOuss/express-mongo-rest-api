const express = require('express')
const router = express.Router()
const User = require('../models/user')
//Login
router.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const query = { email }

    User.findOne(query, (err, user) => {
        if(err) {
            return res.send({
                success : false,
                message : 'Error, please try again'
            })
        }

        if(!user) {
            return res.send({
                success : false,
                message : 'Error, account not found'
            })
        }

        user.isPasswordMatch(password, user.password, (err, isMatch) => {
            if(err) {
                return res.send({
                    success : false,
                    message : 'Error, please try again'
                })
            }

            if(!isMatch) {
                return res.send({
                    success: false,
                    message: 'Error, invalid password'
                })
            }
            
            //Return all infos without password
            let returnUser = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            return res.send({
                success : true, 
                message: 'You can login now',
                user // user == user: user OR user: returnUser
            })

        })
    })
})

//New Registration
router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err, user) =>{
        if(err) {
            return res.send({
                success: false,
                message: 'Error, failed to save the user'
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