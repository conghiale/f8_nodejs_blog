const newsRouter = require('./news')
const meRouter = require('./me')
const siteRouter = require('./site')
const loginRouter = require('./login')
const coursesRouter = require('./courses')

function routes(app) {
    app.use('/login', loginRouter)
    app.use('/courses', coursesRouter)
    app.use('/news', newsRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)
}

module.exports = routes