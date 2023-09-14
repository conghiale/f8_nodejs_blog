const express = require('express')
const {create} = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const sortMiddleware = require('./app/middleware/sortMiddleware')
const helpersHanlebars = require('./helpers/handlebars')
const path = require('path')
const app = express()
const port = 3000

// connect db
const db = require('./config/db')
const { types } = require('util')
db.connect()

// config static files
app.use(express.static(path.join(__dirname, 'public')));

// config to get data from form with method POST
app.use(express.urlencoded({
    extended: true
}))

// config to get data from client send data with method POST and type Json
app.use(express.json())

// override using a query value
app.use(methodOverride('_method'))

// config handlebars
const hbs = create({
    layoutsDir: 'src/resources/views/layouts', 
    partialsDir: ['src/resources/views/partials',],
    defaultLayout: 'main',
    extname: '.hbs', 
    helpers: helpersHanlebars,
})

// templates engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views')) // resourse/views

// Check sort before into routers
app.use(sortMiddleware)

// Routes init
routes(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))