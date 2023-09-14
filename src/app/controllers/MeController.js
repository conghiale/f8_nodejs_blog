const Course = require('../models/Course')
const mongoose = require('../../util/mongoose')

class MeController {
    

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        if (req.query._sort) 
            courseQuery = Course.find({}).sort({[req.query.column]: [req.query.type]})

        // có thể dùng để thay thế Course.countDocumentsDeleted({filter: {deleted: true}})])
        Promise.all([courseQuery, Course.aggregateDeleted([{$match: {deleted: true}}])])
        .then(([courses, aggregateDeleted]) => {
            const countDocumentsDeleted = aggregateDeleted.length
            res.render('me/stored-courses', {countDocumentsDeleted, courses: mongoose.multipleMongooseToObject(courses)})
        })
        .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        let courseQuery = Course.aggregateDeleted([{$match: { deleted: true}}])
        
        if (req.query._sort) {
            const sort_index = {
                'asc': 1,
                'desc': -1
            }
            
            courseQuery = Course.aggregateDeleted([
                {$match: { deleted: true}}, 
                {$sort: { [req.query.column]: sort_index[req.query.type]} }])
        }

        // Course.findDeleted({ deletedAt: { $gt: new Date(Date.now() - 86400000) } }) // Tìm nhung course bị xoa trong 24h
        courseQuery
        .then(courses => {
            res.render('me/trash-courses', {courses}) // course khong nam tren prototype
        })
        .catch(next)
        
        // Course.findDeleted({filter: { deleted: true}}) // Khong the tim thay cac document bi xoa boi user
    }
}

module.exports = new MeController