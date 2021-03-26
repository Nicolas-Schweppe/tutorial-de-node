
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Producto= require('./models/producto')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extends : false }))
app.use(bodyParser.json())


app.get('/api/producto',(req,res)=>{
  Producto.find({},(err,producto)=>{
    if(err)return res.status(500).send({menssage:`error al traer ${err}`})
    if(!producto) res.status(404).send({menssage:`error no existe producto`})

    res.send(200,{producto})
  })
})

app.get('/api/producto/:productoId', (req, res)=>{
  //res.send(200,{menssage:`pruducto numero ${req.params.productoId}!!!`})
  let productoId = req.params.productoId

  Producto.findById(productoId,(err,producto)=> {
    if(err)return res.status(500).send({menssage:`error al traer ${err}`})
    if(!producto) res.status(404).send({menssage:`error no existe producto`})

    res.status(200).send({producto})
  })
})

app.post('/api/producto',(req,res) => {
  console.log('POST/api/producto')


  //console.log(req,body)
    let producto = new Producto()
    producto.name = req.body.name
    producto.imagen = req.body.imagen
    producto.precio = req.body.precio
    producto.categoria = req.body.categoria
    producto.descripcion= req.body.descripcion



    producto.save((err,productoStore)=>{
      if(err) res.status(500).send({menssage:`error al guardar ${err}`})
      res.status(200).send({producto:productoStore})
    })

})

app.put('/api/producto/:productoId',(req,res)=>{
  let productoId = req.params.productoId
  let update = req.body

  Producto.findByIdAndUpdate(productoId , update,(err,productoUpdate)=>{
    if(err) res.status(500).send({menssage:`Error al actualizar ${err}`})

    res.status(200).send({producto:productoUpdate})
  })
})

app.delete('/api/producto/:productoId',(req,res)=>{
  let productoId = req.params.productoId

  Producto.findById(productoId,(err,producto)=>{
    if(err) res.status(500).send({menssage:`error al borrar ${err}`})

      producto.remove(err =>{
        if(err) res.status(500).send({menssage:`error al borrar ${err}`})
        res.status(200).send({menssage:'borrado'})
      })
  })
})

mongoose.connect('mongodb://localhost:27017/tienda', (err,res) => {
  if(err) {
    return console.log('Error al conectar la base de datos')
  }
  console.log('base de datos funcionando')

  app.listen(port, () => {
    console.log(`corriendo en http:${port}`)

  })
})
