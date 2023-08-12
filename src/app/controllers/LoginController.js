class LoginController {
    index(req, res) {
        res.render('login')
    }

    handlePost(req, res) {
        res.send('HANDLER_POST_LOGIN')
    }
}

module.exports = new LoginController