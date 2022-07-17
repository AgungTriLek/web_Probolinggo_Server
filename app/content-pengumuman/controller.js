const ContentPengumuman = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const content = await ContentPengumuman.find()

            res.render('admin/content-pengumuman/view-content-pengumuman.ejs', {
                content,
                alert,
                name: req.session.user.name,
                title: "Halaman content pengumuman"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')

        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/content-pengumuman/create.ejs', {
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')

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
                        const content = new ContentPengumuman({
                            title,
                            category,
                            file: filename,
                            
                        })

                        await content.save()
                        req.flash('alertMessage', 'item berhasil ditambah')
                        req.flash('alertStatus', 'success')

                        res.redirect('/content-pengumuman')
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/content-pengumuman')
                    }
                })
            } else {
                let content = await ContentPengumuman({title, category})
                await content.save();

                req.flash('alertMessage', 'item berhasil ditambah')
                req.flash('alertStatus', 'success')

                res.redirect('/content-pengumuman')
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            
            const content = await ContentPengumuman.findOne({_id: id})
            
            res.render('admin/content-pengumuman/edit', {
                content,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')
            
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

            const content = await ContentPengumuman.findOne({_id: id})

            let currentImage = `${config.rootPath}/public/uploads/${content.file}`;
            if(fs.existsSync(currentImage)){
              fs.unlinkSync(currentImage)
            }

            await ContentPengumuman.findOneAndUpdate({
              _id : id
            },{
              title,
              category,
              file: filename,
              
            })
            

            req.flash('alertMessage', "Berhasil ubah content")
            req.flash('alertStatus', "success")
      
            res.redirect('/content-pengumuman')
            
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')
          }
        })
      }else{
        await ContentPengumuman.findOneAndUpdate({
          _id : id
        },{
          title,
          category,
        })
        
        req.flash('alertMessage', "Berhasil ubah content")
        req.flash('alertStatus', "success")
  
        res.redirect('/content-pengumuman')
      }

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content-pengumuman')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await ContentPengumuman.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/content-pengumuman')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const {id} = req.params
            let content = await ContentPengumuman.findOne({_id: id})

            let status = content.status == 'N' ? 'Y' : 'N'

            content = await ContentPengumuman.findOneAndUpdate({
                _id: id
            }, {status})
            req.flash('alertMessage', "status sudah di ubah")
            req.flash('alertStatus', 'success')
            res.redirect('/content-pengumuman')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/content-pengumuman')
        }
    }
}
