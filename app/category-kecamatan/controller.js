const CategoryKecamatan = require('./model')


module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await CategoryKecamatan.find()

            res.render('admin/category-kecamatan/view-category-kecamatan.ejs', {
                category,
                alert,
                name: req.session.user.name,
                title: "Halaman Category"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-kecamatan')

        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category-kecamatan/create.ejs', {
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-kecamatan')

        }
    },
    actionCreate: async (req, res) => {
        try {
            const {name} = req.body
            let category = await CategoryKecamatan({
                name,
            })

            await category.save()
            res.redirect('/category-kecamatan')
            req.flash('alertMessage', 'category berhasil ditambah')
            req.flash('alertStatus', 'success')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-kecamatan')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params

            const category = await CategoryKecamatan.findOne({_id: id})
            console.log(category)

            res.render('admin/category-kecamatan/edit', {
                category,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-kecamatan')
            
        }
    },
    actionEdit: async (req, res) => {

        try {
      const { id } = req.params
      const { name } = req.body


        const category = await CategoryKecamatan.findOneAndUpdate({
            _id : id
        },{
            name,
        })
        
        req.flash('alertMessage', "Berhasil ubah category")
        req.flash('alertStatus', "success")
  
        res.redirect('/category-kecamatan')
      

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category-kecamatan')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await CategoryKecamatan.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/category-kecamatan')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-kecamatan')
        }
    },
    
}
