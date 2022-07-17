const { fileLoader } = require('ejs')
const mongoose = require('mongoose')

let contentSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'judul tidak boleh kosong']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category-informasi'
    },
    date: {
        type: Date,
        require: [true, 'data tidak boleh kosong']
    },
    file: {
        type: String,
        require: [true, 'gambar tidak boleh kosong']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N'
    },
    texts: {
        type: String,
        require: [true, 'isi konten tidak boleh kosong']
    },
},{timestamps: true})

module.exports = mongoose.model('Content-informasi', contentSchema)