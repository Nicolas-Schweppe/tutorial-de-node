'use static'

const express = require('express')
const controladorProducto = require('../controlador/producto')
const api = express.Router()


api.get('/productos',controladorProducto.getProductos)
api.get('/producto/:productoId',controladorProducto.getProducto )
api.post('/producto', controladorProducto.guardarProducto)
api.put('/producto/:productoId',controladorProducto.actualiarProducto)
api.delete('/producto/:productoId',controladorProducto.eliminarProducto)



module.exports = api
