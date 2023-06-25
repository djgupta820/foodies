const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportlocal = require('passport-local')
const passportlocalmongoose = require('passport-local-mongoose')
const router = express.Router()

router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

module.exports = router