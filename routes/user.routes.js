const express = require('express')
const router = express.Router()
const User = require('../models/register.model')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
//Register Routes
router.post('/',async (req,res) => {
    const Userdata = new User({
        email: req.body.email,
        password: req.body.password,
        admin:req.body.admin
    })
    const user = await User.findOne({email:req.body.email})
    if(user) {
        res.status(400).send('Email Already Registered')
    }
    if(!Userdata.email){
        res.status(400).send('Email Required')
    }
    if(!Userdata.password) {
        res.status(400).send('Password Required')
    }
    if (Userdata.email < 6) {
        res.status(400).send('Email should be more than 6 characters')
    }
    if (Userdata.password < 6) {
        res.status(400).send('Password should be more than 6 characters')
    }
    //Hashing the password
    const salt = await bcrypt.genSalt(10)
    Userdata.password = await bcrypt.hash(Userdata.password, salt)
    const data = await Userdata.save()
    const token = Userdata.generateAuthToken()
    res.header('x-auth-token',token).send(data.email)
})

//Getting data
router.get('/',[auth,admin], async (req,res) => {
    const data = await User.find()
    res.send(data)
})
//getting data by id
router.get('/:postid',[auth,admin], async (req,res) => {
    const data = await User.findById(req.params.postid)
    res.json(data)
})  










module.exports = router