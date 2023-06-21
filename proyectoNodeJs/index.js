require('dotenv').config(); //Cargar toda la importación

const Server = require('./models/server')

const server = new Server() //Crear ub objeto de server

server.listen()
