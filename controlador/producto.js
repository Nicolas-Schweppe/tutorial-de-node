'use static'

const Producto = require('../models/producto')

function getProductos(){
  Producto.find({},(err,producto)=>{
    if(err)return res.status(500).send({menssage:`error al traer ${err}`})
    if(!producto) res.status(404).send({menssage:`error no existe producto`})

    res.send(200,{producto})
  })
}

function getProducto(){
  let productoId = req.params.productoId

  Producto.findById(productoId,(err,producto)=> {
    if(err)return res.status(500).send({menssage:`error al traer ${err}`})
    if(!producto) res.status(404).send({menssage:`error no existe producto`})

    res.status(200).send({producto})
  })
}

function guardarProducto(){
  console.log('POST/api/producto')


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

}

function actualiarProducto(){
  let productoId = req.params.productoId
  let update = req.body

  Producto.findByIdAndUpdate(productoId , update,(err,productoUpdate)=>{
    if(err) res.status(500).send({menssage:`Error al actualizar ${err}`})

    res.status(200).send({producto:productoUpdate})
  })
}

function eliminarProducto(){
  let productoId = req.params.productoId

  Producto.findById(productoId,(err,producto)=>{
    if(err) res.status(500).send({menssage:`error al borrar ${err}`})

      producto.remove(err =>{
        if(err) res.status(500).send({menssage:`error al borrar ${err}`})
        res.status(200).send({menssage:'borrado'})
      })
  })
}

module.exports = {
  getProducto,
  getProductos,
  guardarProducto,
  actualiarProducto,
  eliminarProducto
}
