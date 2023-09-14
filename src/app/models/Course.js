const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema


const CourseSchema = new Schema({
    name: { type: String, required: true, default: 'None', max: 255},
    description: { type: String, required: true, default: 'None', max: 600},
    videoId: { type: String, required: true, default: 'None', max: 600},
    level: { type: String, required: true, default: 'None', max: 600},
    image: { type: String, required: true, default: 'None', max: 255},
    slug: { type: String, slugSchema: { slug: 'name', unique: true }},
}, {
    timestamps: true,
});

CourseSchema.query.sortable = function (req) {
    // this -> là phuong thuc truy van ma minh muon thuc hien truoc khi sort
    if (req.query._sort) {
        const isTypeCorrect = ['asc', 'desc'].includes(req.query.type)
        return this.sort({[req.query.column]: isTypeCorrect ? req.query.type : 'desc'})
    }
    return this
}


// Add plugin options
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: 'all' })  // Override all methods: https://www.npmjs.com/package/mongoose-delete

module.exports = mongoose.model('Course', CourseSchema)
