const { response } = require('express')
const Cliente = require('../models/cliente')

//Crear
const postCliente = async (req, res = response) => {

    const body = req.body//Desestruturación
    let mensaje = ''
    const cliente = new Cliente(body) //Crear el objeto

    try {
        await cliente.save()
        mensaje = 'El cliente se registro exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

//Consultar
const getCliente = async (req, res = response) => {

    let mensaje = ''
    try {
        //Consultar en la colección
        const clientes = await Cliente.find()
        mensaje = clientes
    } catch (error) {
        mensaje = error
    }

    res.json({
        clientes: mensaje
    })
}

//Actualizar
const putCliente = async (req, res = response) => {

    const body = req.body //Desestructuración
    let mensaje = ''

    try {
        await Cliente.findOneAndUpdate({_id: body._id}, {nombre: body.nombre, cedula: body.cedula, email: body.email, telefono: body.telefono, estado: body.estado })
        mensaje = 'Actualización exitosa. Modificación: Sencilla'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje: mensaje
    })
}

//Eliminar
const deleteCliente = async (req, res = response) => {
    const body = req.body //Desestructuración
    let mensaje = ''

    try {
        await Cliente.deleteOne({_id: body._id})
        mensaje = 'Eliminación exitosa'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

module.exports = {
    postCliente,
    getCliente,
    putCliente,
    deleteCliente
}
