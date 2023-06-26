const express = require('express')
const User = require('../models/User')
const Food = require('../models/Food')
const {isLoggedIn} = require('../middlewares')
const router = express.Router()

// rendering cart
router.get('/products/user/cart', isLoggedIn, (req,res)=>{
    const cart = req.user.cart
    const totalAmount = cart.reduce((sum, item)=> sum + item.price * item.count, 0)
    res.render('cart/cart', {cart, totalAmount})
})

// adding to cart
router.post('/products/:productId/cart', isLoggedIn, async (req,res)=>{
    const {productId} = req.params
    const userId = req.user._id
    const user = await User.findById(userId)
    // check if item is present in cart
    const isPresent = user.cart.some((item) => item.id.equals(productId))
    if(isPresent){
        const updatedCart = user.cart.map((item)=>item.id.equals(productId) ? {...item, count: item.count + 1}: item)
        user.cart = updatedCart
    }else{   
        const product = await Food.findById(productId)
        user.cart.push({
            name: product.name,
            price: product.price,
            img: product.image,
            id: product._id
        })
    }
    await user.save()
    res.redirect('/products/user/cart')
})

// removing item from cart
router.post('/products/:productId/remove', isLoggedIn, async (req,res)=>{
    const {productId} = req.params
    let cart = req.user.cart
    let removeIndex = 0
    for(let i=0; i<cart.length; i++){
        if(cart[i]._id == productId){
            removeIndex = i
            break
        }
    }
    let newCart = []
    for(let i=0; i<cart.length; i++){
        if(i == removeIndex){
            continue
        }
        newCart.push(cart[i])
    }
    await User.updateOne({username: req.user.username}, {$set: {cart: newCart}})
    req.flash('success', 'item removed')
    res.redirect('/products/user/cart')
})
module.exports = router