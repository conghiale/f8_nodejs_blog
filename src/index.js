const express = require('express')
const {create} = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));

// config handlers
const hbs = create({
    layoutsDir: 'src/resources/views/layouts', 
    partialsDir: ['src/resources/views/partials',],
    defaultLayout: 'main',
    extname: '.hbs', 
})

// templates engine
app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => res.render('home'))
app.get('/news', (req, res) => res.render('news'))

app.listen(port, () => console.log(`listening at http://localhost:${port}`))