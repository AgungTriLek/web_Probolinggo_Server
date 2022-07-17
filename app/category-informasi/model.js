const mongoose = require('mongoose')

let categoryInformasiSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'category tidak boleh kosong']
    },
})

module.exports = mongoose.model('category-informasi', categoryInformasiSchema)
