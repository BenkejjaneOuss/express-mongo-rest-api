const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true},
    done: Boolean,
    owner: { type: String, required: true}
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task