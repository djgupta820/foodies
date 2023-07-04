const express = require('express')
const multer = require('multer')
const Food = require('../models/Food')
const {isLoggedIn} = require('../middlewares')
const router = express.Router()

// showing products/dashboard page
router.get('/', async (req,res)=>{
    const items = await Food.find({})
    res.render('products/dashboard', {items})
})

// viewing a product
router.get('/:itemId/view', async (req,res)=>{
    const {itemId} = req.params
    const item = await Food.findById(itemId).populate('reviews')
    res.render('products/view', {item})
})

// rendering add new product page
router.get('/new', isLoggedIn, (req,res)=>{
    res.render('products/new')
})

// Object for info. of file on server
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        return callback(null, './public/uploads')
    },
    filename: function(req, file, callback){
        return callback(null, `${Date.now()}-${file.originalname}`)
    }
})
// object for uploading file on server (used as middleware)
const upload = multer({storage})

// adding new product to db
router.post('/new', upload.single('image'), async (req,res)=>{
    const {name, category, price, description} = req.body
    const image = '/uploads/' + req.file.filename
    const poster = req.user._id
    await Food.create({name, category, price, image, description, poster})
    req.flash('success', `${name} added successfully`)
    res.redirect('/products')
})

// viewing edit product page
router.get('/:itemId/edit', isLoggedIn, async (req,res)=>{
    const {itemId} = req.params
    const item = await Food.findById(itemId)
    res.render('products/edit', {item})
})

// updating product
router.patch('/:itemId/edit', async (req,res)=>{
    const {itemId} = req.params
    const {name, category, price, image, description} = req.body
    await Food.findByIdAndUpdate(itemId, {name, category, price, image, description})
    req.flash('success', `${name} updated successfully`)
    res.redirect(`/products/${itemId}/view`)
})

// searching for product
router.get('/search', async (req,res)=>{
    const {q} = req.query
    // regex to search items
    const items = await Food.find({name: {$regex: `(?i)${q}(?-i)`}})
    res.render('products/results', {q, items})
})

// Deleting item
router.delete('/:productId', async (req,res)=>{
    const {productId} = req.params
    await Food.findByIdAndDelete(productId)
    req.flash('success', 'item deleted successfully')
    res.redirect('/products')
})

router.get('/test', (req,res)=>{
    res.send(req.user._id)
})
module.exports = router