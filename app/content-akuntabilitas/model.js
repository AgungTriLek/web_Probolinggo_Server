const { fileLoader } = require('ejs')
const mongoose = require('mongoose')

let contentPengumumanSchema = mongoose.Schema({
    
    title: {
        type: String,
        require: [true, 'gambar tidak boleh kosong']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category-akuntabilitas',
    },
    file: {
        type: String,
        require: [true, 'gambar tidak boleh kosong']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    }
    
},{timestamps: true})

module.exports = mongoose.model('Content-akuntabilitas', contentPengumumanSchema)