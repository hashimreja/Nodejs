const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const registerSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:220
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    admin:Boolean
})
registerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({email:this.email,admin:this.admin}, config.get('jwtPrivateKey'))
    return token
}

module.exports = mongoose.model('register',registerSchema)