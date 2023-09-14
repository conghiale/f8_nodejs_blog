const Course = require('../models/Course')
const mongoose = require('../../util/mongoose')
const { response } = require('express')

class CourseController {
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then(course => res.render('courses/course', {course: mongoose.mongooseToObject(course)}))
        .catch(next)
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        // You can use a Model to create new documents using `new`:
        const formData = req.body
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(formData);

        course.save()
        .then(course => {
            res.redirect('/');
        })
        .catch(error => {
            next(error);
        });

    }

    // [GET] /courses/:id/update
    edit(req, res, next) {
        Course.findOne({_id: req.params.id})
        .then(course => res.render('courses/update', { course: mongoose.mongooseToObject(course)}))
        .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [DELETE] /courses/:id/force
    force_delete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.actions) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break
            case 'delete_force':
                Course.deleteOne({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break
            default:
                res.send('Actions not valid')
        }
    }
}

module.exports = new CourseController