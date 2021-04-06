'use static'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const bcript = require('bcrypt-nodejs')

const usuarioSchema = new Schema({
  email: {type:String , unique : true , lowercase:true },//unique para q no repita correo lowercase es para poner todo en mayuscula
  nombre:String,
  avatar:String,
  contraseña:{type:String , select: false},
  signuDate: {type : Date , default : Date.now()},
  lastLogin: Date
})

usuarioSchema.pre('save',(next)=>{
  let usuario = this
  if(usuario.isModified('constraseña')) return next()

  bycript.genSalt(10,(err,salt)=>{
    if(err) return next(err)

    bycript.hash(usuario.contraseña,salt,null,(err, hash)=>{
      if(err) return next(err)

      usuario.contraseña=hash
      next()
    })
  })

usuarioSchema.methods.gravatar= function(){
  if(!this.email)return 'https//gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https//gravatar.com/avatar/${md5}?s=200&d=retro `
  }
})

module.exports= mongoose.model('usuairo',usuarioSchema)
