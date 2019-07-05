const express = require('express')
const router = express.Router()
const User = require('../models/register.model')
const bcrypt = require('bcrypt')

router.post('/',async (req,res) => {
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(400).send('Invalid email and password')
    }
    validatepassword = await bcrypt.compare(req.body.password,user.password)
    if(!validatepassword){
        res.status(400).send('Invalid email and password')
    }
    const token = user.generateAuthToken()
    res.send(token)
    
})



module.exports = router