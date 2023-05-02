const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static register method
userSchema.statics.register = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('Please fill in all fields')
    }
    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough - requires capital, number, symbol')
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw Error('This email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
} 

// static login method
userSchema.statics.login = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('Please fill in all fields')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error("User doesn't exist")
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

const User = mongoose.model('User', userSchema);

module.exports = User;