const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, require: true}
})

const User = mongoose.model('User', userSchema)
module.exports = User

