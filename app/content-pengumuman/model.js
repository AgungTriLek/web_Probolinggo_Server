const { fileLoader } = require('ejs')
const mongoose = require('mongoose')

let contentPengumumanSchema = mongoose.Schema({
    
    title: {
        type: String,
        require: [true, 'gambar tidak boleh kosong']
    },
    category: {
        type: String,
        default: "Pengumuman"
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

module.exports = mongoose.model('Content-pengumuman', contentPengumumanSchema)