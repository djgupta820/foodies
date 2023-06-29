const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    retailer: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        default: 'NULL'
    },
    cart: [{
        name: String,
        price: Number,
        img: String,
        id: mongoose.Schema.Types.ObjectId,
        count: {
            type: Number,
            default: 1,
            min: [0, "Quantity cannot ne less than 1"]
        }
    }]
})

UserSchema.plugin(passportLocalMongoose)
const User = new mongoose.model('User', UserSchema)

module.exports = User