const express = require('express');

const users = express.Router()

const cors = require('cors')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const User = require('../models/user')

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register',(req, res) => {
    const today = new Date()
    var  type = ''
    if(req.body.type!=''){
        type = req.body.type
    }else{
        type = '0'
    }
    const userdata = {
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        usertype : type,
        contactno : req.body.contactno,
        created : today
    }
    User.findOne({
        email : req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash) => {
                userdata.password = hash
                User.create(userdata)
                .then(user =>{
                    res.json({status : user.email + 'Registered'})
                })
                .catch(err => {
                    res.send('error : '+err)
                })
            })
        }else{
            res.json({error : 'User allready exists'})
        }
    })
    .catch(err =>{
        res.send('error : '+err)
    })
})


users.post('/login', (req,res) => {
    User.findOne({
        email : req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload ={
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    username : user.username,
                    usertype : user.usertype,
                    contactno : user.contactno
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn : 1400
                })
                res.json({token : token})
            }else{
                res.json({error : 'User does not exists'})
            }
        }else{
            res.json({error : 'User does not exists'})
        }
    })
    .catch(err =>{
        res.send('error: '+ err )
    })
})

users.get('/profile',(req,res) => {
    var decoded = jwt.verify(req.header['authorization'],process.env.SECRET_KEY)
    User.findOne({
        _id : decoded._id
    })
    .then(user=> {
        if(user){
            res.json(user)
        }else{
            res.send('User does not exist')
        }
    })
    .catch(err=>{
        res.send('error'+ err)
    })
})

module.exports = users

