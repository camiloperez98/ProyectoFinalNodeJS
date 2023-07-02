const cookieParser = require('cookie-parser')
const express = require('express')

const cors = require('cors') //Implementar seguridad

const bodyParser = require('body-parser') //Recibir los datos

const dbConection = require('../database/config')

class server {
    
    constructor(){
        this.app = express()

        this.PORT = process.env.PORT

        this.clientePath = '/api/cliente'
        this.ventaPath = '/api/venta'
        this.usuarioPath = '/api/usuario'
        this.authPath = '/api/auth'

        this.middlewares() //Seguridad

        this.routes()

        this.dbConectar()
    }

    middlewares() { //Directorio publico
        this.app.use(cookieParser());
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    routes(){
        this.app.use(this.clientePath, require('../routes/cliente'))
        this.app.use(this.ventaPath, require('../routes/venta'))
        this.app.use(this.usuarioPath, require('../routes/usuario'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    async dbConectar(){
        await dbConection()
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Escuchando por el puerto ${this.PORT}`)
        })
    }
}

//Exportar la clase server
module.exports = server