const contentInformasi = require('../content-informasi/model')
const User = require('../user/model')

module.exports = {
    index : async (req, res) => {
        try {
            const content = await contentInformasi.countDocuments()
            const user = await User.countDocuments()
            res.render('index', {
                name: req.session.user.name,
                title: "Halaman Dashboard",
                count: {
                    content,
                    user
                }
            }
                
            )
        } catch (err) {
            
        }
    }
}