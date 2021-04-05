'use static'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcript = require('bcrypt-nodejs')

const usuarioSchema = new Schema({
  email: {type:String , unique : true , lowercase:true },
  nombre:String,
  avatar:String,
  contraseña:{type:String , select: false},
  signuDate: {type : Date , default : Date.now()},
  lastLogin: Date
})

usuarioSchema.pre('save',(next)=>{
  let usuario = this
  if(usuario.isModified('constraseña'))
})
