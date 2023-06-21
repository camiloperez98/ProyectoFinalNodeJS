//Importar el esquema de mongoose
const { Schema, model } = require('mongoose')

//Definir la estructura de la colección
const VentaSchema = Schema({
    numeroVenta: {
        type: Number,
        required: [true, 'El numero de venta es obligatorio'],
        min: 1
    },
    fecha: {
        type: Date,
        default: Date.now
        
    },
    nombreCliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    subtotal: {
        type: Number,
        required: [true, 'El subtotal de la venta es obligatorio']
    },
    iva: {
        type: Number,
        required: [true, 'El iva es obligatorio'],
    },
    totalVenta: {
        type: Number,
        required: true,
        default: function () {
            return this.subtotal + (this.subtotal * (this.iva / 100))
        }
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    }
})

module.exports = model('Venta', VentaSchema)











/*
//Definir la estructura de la colección
const DetalleVentaSchema = Schema({
    producto:{
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    cantidad:{
        type: Number,
        required: [true, 'La cantidad en obligatoria']
    },
    valorUnitario:{
        type: Number,
        required: [true, 'El valor unitario es obligatorio']
    },
    total:{
        type: Number,
        
    }
})

//Función de pre-guardado para calcular el total de cada detalle de venta 
DetalleVentaSchema.pre('save', (next) =>{
    this.total = this.valorUnitario * this.cantidad,
    next()
})

const VentaSchema = Schema({
    numeroVenta:{
        type: Number,
        required: [true, 'El numero de venta es obligatorio']
    },
    fecha:{
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    nombreCliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    detalle:[{ //Array de objetos en detalle de venta
        type: DetalleVentaSchema,
        required: [true, 'Los detalles de la venta son obligatorios']
    }],
    iva: {
        type: Number,
        required: [true, 'El iva es obligatorio']
    },
    totalVenta: {
        type: Number,
    },
    estado:{
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    }
})

//Función de pre-guardado para calcular el total de la venta 
VentaSchema.pre('save', (next) => {
    let totalVenta = 0
    for(const detalle of this.detalle){
        totalVenta+=detalle.total

    }
    this.totalVenta = iva + totalVenta
    next()
})

module.exports = {
    Venta: model('Venta', VentaSchema),
    DetalleVenta: model('DetalleVenta', DetalleVentaSchema)
}*/