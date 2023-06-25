const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const port = 5000

mongoose.connect('mongodb://127.0.0.1:27017/foodies')
.then(()=>console.log('connected to foodies'))
.catch(()=>console.log('error'))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use('/products', productRoutes)

app.get('/', (req,res)=>{
    res.send('goto <a href="/products"> products </a>')
})

app.listen(port, () => console.log('foodies running on http://localhost:5000'))