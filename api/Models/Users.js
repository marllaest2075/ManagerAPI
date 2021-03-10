const mongoose = require('mongoose')
const schema = mongoose.Schema

const Users = mongoose.model('User', new schema({
    userName : String,
    email : String,
    password : String,
    salt : String,
    role : {type : String, default : 'user'}
}))
module.exports = Users