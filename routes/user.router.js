'use strict'

module.exports = app => {

    let route = '/user'

    app.get(`${route}/`, (req, res) => {
        res.send('ok');
    })

}

