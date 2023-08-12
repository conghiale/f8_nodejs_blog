class NewsController {
    index(req, res) {
        res.render('news')
    }

    details(req, res) {
        res.send('NEWS DETAILS!!!')
    }
}

module.exports = new NewsController