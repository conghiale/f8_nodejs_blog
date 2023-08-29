const Course = require('../models/Course')

class SiteController {
    home(req, res) {
   
        Course.find({})
        .then(function(course) {
            res.json(course)
        })
        .catch(function(error) {
            res.status(500).json({error:'ERROR'})
        })
        // res.render('home')
    }

    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController