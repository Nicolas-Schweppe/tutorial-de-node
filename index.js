'use static'

const mongoose = require('mongoose')
const api = require('./app')
const config = require('./config')


mongoose.connect(config.db , (err,res) => {
  if(err) {
    return console.log('Error al conectar la base de datos')
  }
  console.log('base de datos funcionando')

  app.listen(config.port, () => {
    console.log(`corriendo en http:${config.port }`)

  })
})
