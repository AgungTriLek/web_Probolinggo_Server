var express = require('express');
var router = express.Router();
const {landingPage, detailHomePage, catInformasiPage, contInformasiPage, catAkuntabilitasPage,contAkuntabilitasPage,contKecamatanPage, catKecamatanPage, contPengumumanPage} = require('./controller')

/* GET home page. */
router.get('/landingpage', landingPage)
router.get('/detailhomepage/:id', detailHomePage)
router.get('/categoryinformasi', catInformasiPage)
router.get('/categoryakuntabilitas', catAkuntabilitasPage)
router.get('/categorykecamatan', catKecamatanPage)
router.get('/contentinformasi', contInformasiPage)
router.get('/contentakuntabilitas', contAkuntabilitasPage)
router.get('/contentkecamatan', contKecamatanPage)
router.get('/contentpengumuman', contPengumumanPage)

module.exports = router;
