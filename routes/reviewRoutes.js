const express = require('express')
const Food = require('../models/Food')
const Review = require('../models/Review')
const router = express.Router()

router.post('/products/:productId/review', async (req,res)=>{
    const {productId} = req.params
    const {rating, comment} = req.body
    const food = await Food.findById(productId)
    let user = ''
    if(req.user){
        user = req.user.username
    }else{
        user = 'unknownUser'
    }
    const review = await Review.create({user, rating, comment})
    food.reviews.push(review)
    await food.save()
    req.flash('success', 'rating added successfully')
    res.redirect(`/products/${productId}/view`)
})

module.exports = router