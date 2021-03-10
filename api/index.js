const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const auth = require('./routes/Auth')

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})

app.use('/api/auth/',auth)



module.exports = app