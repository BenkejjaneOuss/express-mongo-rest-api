const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, require: true}
})

UserSchema.pre('save', function (next) {
    
    if(!this.isModified('password')){
        return next();
    }
    
    const user = this
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
        callback(null, isMatch)
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User

