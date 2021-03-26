'use static'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

 const productoSchema = Schema({
  name: String,
  imagen: String,
  precio: {type: Number , default : 0},
  categoria: {  type : String , enum:['computadora', 'telefono', 'accesorios' ] },
  descripcion: String

})

module.exports =mongoose.model('producto',productoSchema)
