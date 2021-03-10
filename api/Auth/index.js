const jwt = require('jsonwebtoken')
const Users = require('../Models/Users')

const isAuthenticated = (req,res,next)=>{
    const token = req.headers.Authorization
    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token,'mi_secreto',(err,decode)=>{
        const{_id} = decode
        Users.findOne({_id}).exec()
        .then(user=>{
            req.user = user
            next()
        })
    })
}

const hasRoles = roles=>{
    if(roles.indexOf(req.user.role) > -1){
        return next()
    }
    res.sendStatus(403)
}
module.exports = { isAuthenticated, hasRoles }