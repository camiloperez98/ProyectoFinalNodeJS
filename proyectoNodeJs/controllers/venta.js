const { response } = require('express')
const Venta = require('../models/venta')

//Registrar
const postVenta = async (req, res = response) => {

    const body = req.body //Desestructuración
    let mensaje = ''
    const venta = new Venta(body) //Crear el objeto

    try {
        await venta.save()
        mensaje = 'Venta Creada exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

//Consultar
const getVenta = async (req, res = response) => {
    let mensaje = ''

    try {
        //Consultar en la coleccion
        const ventas = await Venta.find()
        mensaje = ventas
    } catch (error) {
        mensaje = error
    }

    res.json({
        ventas: mensaje
    })
}

//Actualizar
const putVenta = async (req, res = response) => {
    const body = req.body //Desestruturación
    let mensaje = ''
    function calcular (body) {
        return body.subtotal + (body.subtotal * (body.iva / 100))
    }
    let resultado = calcular(body)

    try {
        await Venta.findOneAndUpdate({ _id: body._id }, { numeroVenta: body.numeroVenta, fecha: body.fecha, nombreCliente: body.nombreCliente, subtotal: body.subtotal, iva: body.iva, totalVenta: body.totalVenta , estado: body.estado})
        mensaje = 'Venta actualizada'

    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje: mensaje
    })
}

//Eliminar
const deleteVenta = async(req, res = response) =>{
    const body = req.body //Desestructuración
    let mensaje = ''

    try{
        await Venta.deleteOne({_id: body._id})
        mensaje = 'Venta eliminada'
    }catch(error){
        mensaje = error
    }

    res.json({
        mensaje
    })
}

module.exports = {
    postVenta,
    getVenta,
    putVenta,
    deleteVenta
}