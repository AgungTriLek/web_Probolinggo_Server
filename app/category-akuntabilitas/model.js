const mongoose = require('mongoose')

let categoryAkuntabilitasSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'category tidak boleh kosong']
    },
})

module.exports = mongoose.model('Category-akuntabilitas', categoryAkuntabilitasSchema)
