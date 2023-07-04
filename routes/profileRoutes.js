const express = require('express')
const User = require('../models/User')
const Food = require('../models/Food')
const router = express.Router()
const {isLoggedIn} = require('../middlewares')

router.get('/profile', isLoggedIn, async (req,res)=>{
    const user = req.user
    const products = await Food.find({poster: user._id})
    res.render('profile/profile', {user, products})
})

module.exports = router