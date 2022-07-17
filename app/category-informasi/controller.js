const CategoryInformasi = require('./model')


module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await CategoryInformasi.find()

            res.render('admin/category-informasi/view-category-informasi.ejs', {
                category,
                alert,
                name: req.session.user.name,
                title: "Halaman Category"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/Category-informasi')

        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category-informasi/create.ejs', {
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-informasi')

        }
    },
    actionCreate: async (req, res) => {
        try {
            const {name} = req.body
            let category = await CategoryInformasi({
                name,
            })

            await category.save()
            res.redirect('/category-informasi')
            req.flash('alertMessage', 'category berhasil ditambah')
            req.flash('alertStatus', 'success')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-informasi')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params

            const category = await CategoryInformasi.findOne({_id: id})
            console.log(category)

            res.render('admin/category-informasi/edit', {
                category,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-informasi')
            
        }
    },
    actionEdit: async (req, res) => {

        try {
      const { id } = req.params
      const { name } = req.body


        const category = await CategoryInformasi.findOneAndUpdate({
            _id : id
        },{
            name,
        })
        
        req.flash('alertMessage', "Berhasil ubah category")
        req.flash('alertStatus', "success")
  
        res.redirect('/category-informasi')
      

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category-informasi')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await CategoryInformasi.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/Category-informasi')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/Category-informasi')
        }
    },
    
}
