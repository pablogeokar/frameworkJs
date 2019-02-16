
function template(name) {

    let _template =
        `'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ${name}Model = new Schema({
    fieldTest: { type: String }           
}, { versionKey: false })

module.exports = mongoose.model('${name}', ${name}Model)`

    return _template

}

module.exports = template;