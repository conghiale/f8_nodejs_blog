const express = require('express')
const {create} = require('express-handlebars')
const routes = require('./routes')
const path = require('path')
const app = express()
const port = 3000

// connect db
const db = require('./config/db')
db.connect()

// config static files
app.use(express.static(path.join(__dirname, 'public')));

// config to get data from form with method POST
app.use(express.urlencoded({
    extended: true
}))

// config to get data from client send data with method POST and type Json
app.use(express.json())

// config handlebars
const hbs = create({
    layoutsDir: 'src/resources/views/layouts', 
    partialsDir: ['src/resources/views/partials',],
    defaultLayout: 'main',
    extname: '.hbs', 
})

// templates engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views')) // resourse/views

// Routes init
routes(app)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))