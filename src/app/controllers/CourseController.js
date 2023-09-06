const Course = require('../models/Course')
const mongoose = require('../../util/mongoose')

class CourseController {
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then(course => res.render('courses/course', {course: mongoose.mongooseToObject(course)}))
        .catch(next)
    }

    // // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        // You can use a Model to create new documents using `new`:
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`
        formData.slug = 'demo'
        const course = new Course(formData);

        course.save()
        .then(course => {
            res.redirect('/');
        })
        .catch(error => {
            next(error);
        });

    }
}

module.exports = new CourseController