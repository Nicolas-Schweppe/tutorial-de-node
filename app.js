'use satic'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const controladorProducto = require('./controlador/producto')
const api = require('./rutas')

app.use(bodyParser.urlencoded({ extends : false }))
app.use(bodyParser.json())
app.use('/api',api)





module.exports = app
