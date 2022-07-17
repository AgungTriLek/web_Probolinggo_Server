const ContentInformasi = require('../content-informasi/model')
const ContentPengumuman = require('../content-pengumuman/model')
const ContentKecamatan = require('../content-kecamatan/model')
const ContentAkuntabilitas = require('../content-akuntabilitas/model')
const CategoryInformasi = require('../category-informasi/model')
const CategoryAkuntabilitas = require('../category-akuntabilitas/model')
const CategoryKecamatan = require('../category-kecamatan/model')

module.exports = {
    landingPage: async (req, res) => {
        try {
            const content = await ContentInformasi.find({status: "Y"} )
                .populate('category') 
            const contentPengumuman =  await ContentPengumuman.find({status: "Y"})
            res.status(200).json({data: content.concat(contentPengumuman) })

        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    detailHomePage: async (req, res) => {
        try {
            
            const {id} = req.params
            const content = await ContentInformasi.find({_id: id}).populate("category") 
            const contentPengumuman = await ContentPengumuman.find({_id: id})
            
            if (!content || !contentPengumuman) {
            return res.status(404).json({message: err.message || "Content tidak tersedia"})
            }
            res.status(200).json({data: contentPengumuman} && {data: content})
            
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
            
        }
    },
    catInformasiPage: async (req, res) => {
        try {
            const category = await CategoryInformasi.find()
            res.status(200).json({category})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    contInformasiPage: async (req, res) => {
        try {
            
            const content = await ContentInformasi.find({status: "Y"}).populate("category") 
            res.status(200).json({data: content})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    catKecamatanPage: async (req, res) => {
        try {
            const category = await CategoryKecamatan.find()
            res.status(200).json({category})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    contKecamatanPage: async (req, res) => {
        try {
            
            const content = await ContentKecamatan.find({status: "Y"}).populate("category") 
            res.status(200).json({data: content})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    catAkuntabilitasPage: async (req, res) => {
        try {
            const category = await CategoryAkuntabilitas.find()
            res.status(200).json({category})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    contAkuntabilitasPage: async (req, res) => {
        try {
            
            const content = await ContentAkuntabilitas.find({status: "Y"}).populate("category") 
            res.status(200).json({data: content})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
    contPengumumanPage: async (req, res) => {
        try {
            
            const content = await ContentPengumuman.find({status: "Y"})
            res.status(200).json({data: content})
        } catch (err) {
            res.status(500).json({message: err.message || "Internal Server Error"})
        }
    },
}