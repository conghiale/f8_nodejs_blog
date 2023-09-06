const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema

mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String, required: true, default: 'None', max: 255},
    description: { type: String, required: true, default: 'None', max: 600},
    videoId: { type: String, required: true, default: 'None', max: 600},
    level: { type: String, required: true, default: 'None', max: 600},
    image: { type: String, required: true, default: 'None', max: 255},
    // slug: { type: String, unique: true},
    slug: { type: String, slugSchema: { slug: 'name', unique: true }},
}, {
    // createAt: { type: Date, required: true, default: Date.now },
    // updatedAt: { type: Date, required: true, default: Date.now },
    timestamps: true,
});

module.exports = mongoose.model('Course', Course)
