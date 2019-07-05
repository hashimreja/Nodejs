const config = require('config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/authentication',{useNewUrlParser:true})
    .then(() => {console.log('Connected')})
    .catch((err) => console.log(err))
const router = require('./routes/user.routes')
const loginrouter = require('./routes/login.routes')

app.use(express.json())

if(!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey is not defined')
    process.exit(1)
}

//Routes
app.use('/api/register', router)
app.use('/api/login',loginrouter)

app.listen(9000,() => {
    console.log('listening on port 9000')
})