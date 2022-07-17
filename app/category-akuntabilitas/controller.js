const CategoryAkuntabilitas = require('./model')


module.exports = {
    index : async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const category = await CategoryAkuntabilitas.find()

            res.render('admin/category-akuntabilitas/view-category-akuntabilitas.ejs', {
                category,
                alert,
                name: req.session.user.name,
                title: "Halaman Category"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-akuntabilitas')

        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category-akuntabilitas/create.ejs', {
                name: req.session.user.name,
                title: "Halaman tambah"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-akuntabilitas')

        }
    },
    actionCreate: async (req, res) => {
        try {
            const {name} = req.body
            let category = await CategoryAkuntabilitas({
                name,
            })

            await category.save()
            res.redirect('/category-akuntabilitas')
            req.flash('alertMessage', 'category berhasil ditambah')
            req.flash('alertStatus', 'success')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-akuntabilitas')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params

            const category = await CategoryAkuntabilitas.findOne({_id: id})
            console.log(category)

            res.render('admin/category-akuntabilitas/edit', {
                category,
                name: req.session.user.name,
                title: "Halaman edit"
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-akuntabilitas')
            
        }
    },
    actionEdit: async (req, res) => {

        try {
      const { id } = req.params
      const { name } = req.body


        const category = await CategoryAkuntabilitas.findOneAndUpdate({
            _id : id
        },{
            name,
        })
        
        req.flash('alertMessage', "Berhasil ubah category")
        req.flash('alertStatus', "success")
  
        res.redirect('/category-akuntabilitas')
      

    } catch (err) {
        req.flash('alertMessage', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category-akuntabilitas')
    }
    },
    actionDelete: async (req, res) => {
        try {
            const {id} = req.params;
            
            await CategoryAkuntabilitas.findOneAndDelete({
                _id: id
            });
            
            req.flash('alertMessage', 'item berhasil dihapus')
            req.flash('alertStatus', 'success')
            
            res.redirect('/Category-akuntabilitas')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category-akuntabilitas')
        }
    },
    
}
