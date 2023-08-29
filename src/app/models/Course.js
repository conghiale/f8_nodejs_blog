const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    name: { type: String, required: true, default: 'None', max: 255},
    description: { type: String, required: true, default: 'None', max: 600},
    image: { type: String, required: true, default: 'None', max: 255},
    createAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Course', Course)
