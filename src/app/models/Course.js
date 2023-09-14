const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema


const Course = new Schema({
    name: { type: String, required: true, default: 'None', max: 255},
    description: { type: String, required: true, default: 'None', max: 600},
    videoId: { type: String, required: true, default: 'None', max: 600},
    level: { type: String, required: true, default: 'None', max: 600},
    image: { type: String, required: true, default: 'None', max: 255},
    slug: { type: String, slugSchema: { slug: 'name', unique: true }},
}, {
    timestamps: true,
});

// Add plugin options
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { deletedAt : true, overrideMethods: 'all' })  // Override all methods: https://www.npmjs.com/package/mongoose-delete

module.exports = mongoose.model('Course', Course)
