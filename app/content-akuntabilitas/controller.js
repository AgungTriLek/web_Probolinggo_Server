const ContentAkuntabilitas = require('./model')
const CategoryAkuntabilitas = require('../category-akuntabilitas/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const content = await ContentAkuntabilitas.find().populate('category')

            res.render('admin/content-akuntabilitas/view-content-akuntabilitas.ejs', {
                content,
                alert,
                name: req.session.user.name,
                title: "Halaman content akuntabilitas"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')

        }
    },
    viewCreate: async (req, res) => {
        try {
            const category = await CategoryAkuntabilitas.find()

            res.render('admin/content-akuntabilitas/create.ejs', {
                category,
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')

        }
    },
    actionCreate: async (req, res) => {
        try {
            const {title, category} = req.body
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
                        const content = new ContentAkuntabilitas({
                            title,
                            category,
                            file: filename,
                            
                        })

                        await content.save()
                        req.flash('alertMessage', 'item berhasil ditambah')
                        req.flash('alertStatus', 'success')

                        res.redirect('/content-akuntabilitas')
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/content-akuntabilitas')
                    }
                })
            } else {
                let content = await ContentAkuntabilitas({title, category})
                await content.save();

                req.flash('alertMessage', 'item berhasil ditambah')
                req.flash('alertStatus', 'success')

                res.redirect('/content-akuntabilitas')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const category = await CategoryAkuntabilitas.find()
            
            const content = await ContentAkuntabilitas.findOne({_id: id}).populate('category')
            
            res.render('admin/content-akuntabilitas/edit', {
                category,
                content,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')
            
        }
    },
    actionEdit: async (req, res) => {

        try {
      const { id } = req.params
      const { title, category } = req.body

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

            const content = await ContentAkuntabilitas.findOne({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${content.file}`;
            if(fs.existsSync(currentImage)){
              fs.unlinkSync(currentImage)
            }

            await ContentAkuntabilitas.findOneAndUpdate({
              _id : id
            },{
              title,
              category,
              file: filename,
              
            })
            

            req.flash('alertMessage', "Berhasil ubah content")
            req.flash('alertStatus', "success")
      
            res.redirect('/content-akuntabilitas')
            
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')
          }
        })
      }else{
        await ContentAkuntabilitas.findOneAndUpdate({
          _id : id
        },{
          title,
          category,
        })
        
        req.flash('alertMessage', "Berhasil ubah content")
        req.flash('alertStatus', "success")
  
        res.redirect('/content-akuntabilitas')
      }

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content-akuntabilitas')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await ContentAkuntabilitas.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/content-akuntabilitas')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const {id} = req.params
            let content = await ContentAkuntabilitas.findOne({_id: id})

            let status = content.status == 'N' ? 'Y' : 'N'

            content = await ContentAkuntabilitas.findOneAndUpdate({
                _id: id
            }, {status})
            req.flash('alertMessage', "status sudah di ubah")
            req.flash('alertStatus', 'success')
            res.redirect('/content-akuntabilitas')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-akuntabilitas')
        }
    }
}
