const news = require('./news')
const site = require('./site')
const login = require('./login')

function routes(app) {
    app.use('/login', login)
    app.use('/news', news)
    app.use('/', site)
}

module.exports = routes