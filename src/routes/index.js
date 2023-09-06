const news = require('./news')
const site = require('./site')
const login = require('./login')
const coursesRouter = require('./courses')

function routes(app) {
    app.use('/login', login)
    app.use('/courses', coursesRouter)
    app.use('/news', news)
    app.use('/', site)
}

module.exports = routes