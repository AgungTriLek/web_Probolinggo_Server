
const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    name: {
        type: String,
        require: [true, 'nama tidak boleh kosong']
    },
    email: {
        type: String,
        require: [true, 'email tidak boleh kosong']
    },
    password: {
        type: String,
        require: [true, 'password tidak boleh kosong']
    },
    phoneNumber: {
        type: String,
        require: [true, 'nomor hp tidak boleh kosong']
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema)