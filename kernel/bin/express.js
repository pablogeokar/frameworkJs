'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const morgan = require('morgan')
const variables = require('../config/variables')

const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
variables.Api.debug == 'true'? app.use(morgan('dev')): ''


//Autoload
consign().include('./routes').into(app)

module.exports = app