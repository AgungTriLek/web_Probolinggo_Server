const ContentInformasi = require('./model')
const CategoryInformasi = require('../category-informasi/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const content = await ContentInformasi.find().populate('category')
                console.log(content)

            res.render('admin/content-informasi/view-content-informasi.ejs', {
                content,
                alert,
                name: req.session.user.name,
                title: "Halaman content informasi"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')

        }
    },
    viewCreate: async (req, res) => {
        try {
            const category = await CategoryInformasi.find()
            res.render('admin/content-informasi/create.ejs', {
                category,
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')

        }
    },
    actionCreate: async (req, res) => {
        try {
            const {title, category, date, texts} = req.body
            if (req.file) {
                console.log(req.file, 'ini req file')
            } else {
                console.log('tidak ada req file')
            }
            if (req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const scr = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                scr.pipe(dest)

                scr.on('end', async ()=>{
                    try {
                        const content = new ContentInformasi({
                            title,
                            category,
                            date,
                            file: filename,
                            texts
                        })

                        await content.save()
                        req.flash('alertMessage', 'item berhasil ditambah')
                        req.flash('alertStatus', 'success')

                        res.redirect('/content-informasi')
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/content-informasi')
                    }
                })
            } else {
                let content = await ContentInformasi({title, category, date, texts})
                await content.save();

                req.flash('alertMessage', 'item berhasil ditambah')
                req.flash('alertStatus', 'success')

                res.redirect('/content-informasi')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params

            const category = await CategoryInformasi.find()
            const content = await ContentInformasi.findOne({_id: id}).populate('category')
            console.log(content, 'content informasi')
            console.log(category, 'content kategori')

             

            res.render('admin/content-informasi/edit', {
                content,
                category,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')
            
        }
    },
    actionEdit: async (req, res) => {

        try {
      const { id } = req.params
      const { title, category, date, texts } = req.body

      if(req.file){
        let tmp_path= req.file.path;
        let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)

        src.on('end', async ()=>{
          try {

            const voucher = await ContentInformasi.findOne({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${voucher.file}`;
            if(fs.existsSync(currentImage)){
              fs.unlinkSync(currentImage)
            }

            await ContentInformasi.findOneAndUpdate({
              _id : id
            },{
              title,
              category,
              date,
              file: filename,
              texts
            })
            

            req.flash('alertMessage', "Berhasil ubah voucher")
            req.flash('alertStatus', "success")
      
            res.redirect('/content-informasi')
            
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')
          }
        })
      }else{
        await ContentInformasi.findOneAndUpdate({
          _id : id
        },{
          title,
          category,
          date,
          texts
        })
        
        req.flash('alertMessage', "Berhasil ubah voucher")
        req.flash('alertStatus', "success")
  
        res.redirect('/content-informasi')
      }

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content-informasi')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await ContentInformasi.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/content-informasi')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const {id} = req.params
            let content = await ContentInformasi.findOne({_id: id})

            let status = content.status == 'N' ? 'Y' : 'N'

            content = await ContentInformasi.findOneAndUpdate({
                _id: id
            }, {status})
            req.flash('alertMessage', "status sudah di ubah")
            req.flash('alertStatus', 'success')
            res.redirect('/content-informasi')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-informasi')
        }
    }
}
