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

router.post('/profile/:userId/updateAddress', async (req,res)=>{
    const {userId} = req.params
    const {address} = req.body
    await User.findByIdAndUpdate(userId, {address: address})
    req.flash('success', 'Address updated successfully!')
    res.redirect('/profile')
})

module.exports = router