const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const cartRoutes = require('./routes/cartRoutes')
const profileRoutes = require('./routes/profileRoutes')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const localStrategy = require('passport-local')
const session = require('express-session')
const flash = require('connect-flash')
const User = require('./models/User')
const app = express()
const port = 5000
const ip = 'localhost' 

mongoose.connect('mongodb://127.0.0.1:27017/foodies')
    .then(() => console.log('connected to foodies'))
    .catch(() => console.log('error'))

const sessionConfig = {
    secret: 'weneedagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: 7 * 24 * 60 * 60 * 1000
    }
}

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session(sessionConfig))
app.use(passport.authenticate('session'))
app.use(flash())

// middleware for handling falsh messages and logged-in user
app.use((req,res,next)=>{
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.User = req.user
    next()
})

app.use('/products', productRoutes)
app.use(authRoutes)
app.use(reviewRoutes)
app.use(cartRoutes)
app.use(profileRoutes)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, ip, () => console.log(`foodies running on http://${ip}:${port}`))