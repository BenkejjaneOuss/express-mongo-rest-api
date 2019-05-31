const express = require('express')
const router = express.Router()

const passport = require('passport')

const Task = require('../models/task')

router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
    const task = new Task({
        name: req.body.name,
        done: req.body.done,
        owner: req.body.owner,
    })

    task.save((err, task) => {
        if(err) {
            return res.send({
                success : false,
                message : 'Error, please try again'
            })
        }

        if(!task) {
            return res.send({
                success : false,
                message : 'Error, failed to save the task'
            })
        }
                
        return res.send({
            success : true,
            message : 'Task saved',
            task
        })
        
    })
})

router.post('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.body.owner

    Task.find({ owner }, (err, tasks) => {
        if(err) {
            return res.send({
                success : false,
                message : 'Error, please try again'
            })
        }

        if(!tasks) {
            return res.send({
                success : false,
                message : 'You have no tasks yet'
            })
        }
                
        return res.send({
            success : true,
            message : '',
            tasks
        })
    })
})

router.delete("/remove/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    const taskId =  req.params.id

    Task.findOneAndDelete({ _id : taskId }, (err) => {
        if(err) {
            return res.send({
                success : false,
                message : 'Error, please try again'
            })
        }

        return res.send({
            success: true,
            message: 'Task removed'
        })
    })
})

module.exports = router