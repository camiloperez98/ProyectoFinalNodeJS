const {Router} = require('express')

const route = Router()

//Importar el controlador 
const{postVenta, getVenta, putVenta, deleteVenta} = require('../controllers/venta')

route.post('/', postVenta)

route.get('/', getVenta)

route.put('/', putVenta)

route.delete('/', deleteVenta)

module.exports = route