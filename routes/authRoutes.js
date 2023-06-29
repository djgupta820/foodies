const express = require('express')
const passport = require('passport')
const User = require('../models/User')
const router = express.Router()

router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.post('/register', async (req,res)=>{
    const {name, email, username, phone, password, retailer} = req.body
    // creating the user
    const user = new User({name, email, username, phone, retailer})
    // regestering the user
    const newUser = await User.register(user, password)
    req.flash('success', 'user registered successfully')
    res.redirect('/login')
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login', 
    // invalid username or password handling
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: true
    }),
    // Success handling
    function(req,res){
        req.flash('success', `welcome ${req.user.username}`)
        res.redirect('/products')
    }
)

router.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if(err) return next(err)
        req.flash('success', 'logout success')
        res.redirect('/login')
    })
})

module.exports = router