const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const Users = require('../Models/Users')
const isAuthenticated = require('../Auth/index')

const router = express.Router()

const signToken = ( _id )=>{
    return jwt.sign({_id},'mi_secreto',{expiresIn : 60 * 60 * 24 * 365})
}

router.post('/register',(req,res)=>{
    const {userName,email,password} = req.body
    crypto.randomBytes(16,(err,salt)=>{
        const newSalt=salt.toString('base64')
        crypto.pbkdf2(password,newSalt,10000,64,'sha1',(err,key)=>{
            const encryptedPassword = key.toString('base64')
            Users.findOne(email).exec()
            .then(user=>{
                if(user){
                    res.send('Usuario existente')
                }
                Users.create({
                    userName,
                    email,
                    password,
                    salt: newSalt
                }).then(()=>{ res.send('Usuario creado con exito!!!!')})
            })
        })
    })
})

router.post('/login',(req,res)=>{
    const {userName,password} = req.body
    Users.findOne(userName).exec()
    .then(user=>{
        if(!user){
            res.send('Usuario y/o contraseña incorrectos')
        }
        crypto.pbkdf2(password,user.salt,10000,64,'sha1',(err,key)=>{
            const encryptedPassword = key.toString('base64')
            if(user.password === encryptedPassword){
                const token = signToken(user._id)
                return res.send({token})
            }
            return res.send("Usuario y/o contraseña incorrectos")
        })
    })
})

router.get('/me', isAuthenticated, (req,res)=>{
    res.send(req.user)
})

module.exports = router