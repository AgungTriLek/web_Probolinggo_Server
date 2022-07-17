const mongoose = require('mongoose')

let categoryKecamatanSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'category tidak boleh kosong']
    },
})

module.exports = mongoose.model('category-Kecamatan', categoryKecamatanSchema)
