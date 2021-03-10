const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const auth = require('./routes/Auth')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth/',auth)



module.exports = app