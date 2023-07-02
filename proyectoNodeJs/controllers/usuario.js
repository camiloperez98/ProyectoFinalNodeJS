const { response } = require('express')
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario')

//Consulta
const getUsuario = async (req, res = response) => {
    let mensaje = ''
    try {
        //Consultar en la coleccion
        const usuarios = await Usuario.find()
        mensaje = usuarios
    } catch (error) {
        mensaje = error
    }

    res.json({
        usuarios: mensaje
    })
}

//Registrar
const postUsuario = async (req, res = response) => {

    const body = req.body //Desestructuración
    let mensaje = ''
    const usuario = new Usuario(body) //Crear el objeto
   usuario.password = bcrypt.hashSync(body.password, 10)

    try {
        await usuario.save()
        mensaje = 'Usuario registrado exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

//Editar
const putUsuario = async (req, res = response) => {
    const body = req.body //Desestructuraciòn
    let mensaje = ''

    try {
        if(body.tipoModificacion == 'Unitaria'){
            await Usuario.findOneAndUpdate({_id: body._id}, {rol: body.rol, estado: body.estado})
            mensaje = 'Usuario modificado exitosamente. Modificación: Sencilla'
        }
        else{
            await Usuario.updateMany({password: body.password}, {rol: body.rol, estado: body.estado})
            mensaje = 'Usuario modificado exitosamente. Modificación: Multiple'
        }
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje: mensaje
    })
}
//Eliminar
const deleteUsuario = async(req, res = response) => {
    const body = req.body //Desestructuración
    let mensaje = ''

    try{
        await Usuario.deleteOne({_id: body._id})
        mensaje = 'Usuario eliminado exitosamente'
    }catch(error){
        mensaje = error
    }
    res.json({
        mensaje
    })
}
module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}