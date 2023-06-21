const {Router} = require('express')

const route = Router()

//Importar el controlador
const{postCliente, getCliente, putCliente, deleteCliente} = require('../controllers/cliente')

route.post('/', postCliente)

route.get('/', getCliente)

route.put('/', putCliente)

route.delete('/', deleteCliente)

module.exports = route