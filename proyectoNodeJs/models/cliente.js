//Importar el esquema mongoose
const {Schema, model} = require('mongoose')

//Definir la estructura de la colección
const ClienteSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    cedula:{
        type: Number,
        required: [true, 'La cedula es obligatoria'],
        minlength: [10, 'Cedula incorrecta']
    },
    email:{
        type:String,
        required: [true, 'El correo electrónico es obligatorio']
    },
    telefono:{
        type:Number,
        required: [true, 'El numero de teléfono es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required:[true, 'El estado es obligatorio']
    }
})

module.exports = model('Cliente', ClienteSchema)