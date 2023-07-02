//Importar el esquema mongoose
const { Schema, model } = require('mongoose')

//Definir la estructura de la colección
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [5, 'La contraseña debe tener minimo 5 caracteres'] 
    },
    rol: {
        type: String,
        enum: ['Admin', 'Asesor'],
        required: [true, 'El rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    }
})

module.exports = model('Usuario', UsuarioSchema)
