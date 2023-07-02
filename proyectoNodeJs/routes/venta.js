const {Router} = require('express')

const route = Router()

//Importar el controlador 
const{postVenta, getVenta, putVenta, deleteVenta} = require('../controllers/venta')
const{isAuthenticated} = require('../controllers/auth')

route.post('/', isAuthenticated, postVenta)

route.get('/', isAuthenticated, getVenta)

route.put('/', putVenta)

route.delete('/', deleteVenta)

module.exports = route