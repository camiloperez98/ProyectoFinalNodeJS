const {Router} = require('express')

const route = Router()

//Importar el controlador
const{postCliente, getCliente, putCliente, deleteCliente} = require('../controllers/cliente')
const{isAuthenticated} = require('../controllers/auth')

route.post('/', isAuthenticated, postCliente)

route.get('/', isAuthenticated, getCliente)

route.put('/', putCliente)

route.delete('/', deleteCliente)

module.exports = route