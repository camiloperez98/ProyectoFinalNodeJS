const url = 'http://localhost:8080/api/cliente'

//Clientes ------------------------------------------------------------------------------------------------------------------------------------------------------
const listarClientes = async () => {
    let body = document.getElementById('lista')
    if (body) {
        let mensaje = ''

        fetch(url) //Metodo para llamar la API
            .then(res => res.json())
            .then(function (data) {
                let listarClientes = data.clientes
                listarClientes.map((cliente) => {
                    mensaje += `<tr>
                <td>${cliente.nombre}</td>` +
                        `<td>${cliente.cedula}</td>` +
                        `<td>${cliente.email}</td>` +
                        `<td>${cliente.telefono}</td>` +
                        `<td>${cliente.estado ? 'Activo' : 'Inactivo'}</td>` +
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(cliente)})'>Editar</a>
                <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminarCliente("${cliente._id}")'>Eliminar</a>
                </td></tr>`

                    body.innerHTML = mensaje
                })
            })
    }
}
listarClientes()

const registrarCliente = async () => {
    let nombre = document.getElementById('nombre').value
    let cedula = document.getElementById('cedula').value
    let email = document.getElementById('email').value
    let telefono = document.getElementById('telefono').value
    let estado = document.getElementById('estado').value

    if(nombre.trim() == '' || cedula.trim() == '' || email.trim )

    let cliente = {
        nombre: nombre,
        cedula: cedula,
        email: email,
        telefono: telefono,
        estado: estado
    }

    if (cedula.length >= 10) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //Respuesta del metodo POST de la API
            .then(json => {
                alert(json.mensaje)
            })
    }
    else {
        alert('La cedula debe contener como minimo 10 caracteres')
    }
}

const editar = (cliente) => {
    document.getElementById('_id').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('cedula').value = ''
    document.getElementById('email').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('estado').value = ''

    document.getElementById('_id').value = cliente._id
    document.getElementById('nombre').value = cliente.nombre
    document.getElementById('cedula').value = cliente.cedula
    document.getElementById('email').value = cliente.email
    document.getElementById('telefono').value = cliente.telefono
    document.getElementById('estado').value = cliente.estado
}

const actualizarCliente = async () => {
    //Capturar los datos enviados desde el formulario
    let nombre = document.getElementById('nombre').value
    let cedula = document.getElementById('cedula').value
    let email = document.getElementById('email').value
    let telefono = document.getElementById('telefono').value
    let estado = document.getElementById('estado').value

    let cliente = {
        _id: document.getElementById('_id').value,
        nombre: nombre,
        cedula: cedula,
        email: email,
        telefono: telefono,
        estado: estado,
        tipoModificacion: 'Unitaria'
    }

    if (cedula.length >= 10) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json()) //Respuesta del metodo POST de la API
            .then(json => {
                alert(json.mensaje)
            })
    }
    else {
        alert('La cedula debe contener como minimo 10 caracteres')
    }
}

const eliminarCliente = (_id) => {
    if (confirm('¿Desea realizar la eliminación?') == true) {
        //Capturar valores enviados desde el formulario
        let cliente = {
            _id: _id
        }
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(cliente),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

            .then(response => response.json()) //Respuesta del metodo POST de la API
            .then(json => {
                alert(json.mensaje)
            })
    }
}

if (document.querySelector('#btn-registrar')) {
    document.querySelector('#btn-registrar')
        .addEventListener('click', registrarCliente)
}

if (document.querySelector('#btn-actualizar')) {
    document.querySelector('#btn-actualizar')
        .addEventListener('click', actualizarCliente)
}


//Ventas--------------------------------------------------------------------------------------------------------------------------------------------------------

const urlVenta = 'http://localhost:8080/api/venta'
const listarVentas = async () => {
    let body = document.getElementById('listaVentas')
    if (body) {
        let mensaje = ''
        fetch(urlVenta) // Método para llamar a la API
            .then(res => res.json())
            .then(function (data) {
                let listarVentas = data.ventas // Renombrar la variable para evitar conflicto de nombres
                listarVentas.map((venta) => {
                    mensaje += `<tr>
                    <td>${venta.numeroVenta}</td>` +
                        `<td>${venta.fecha}</td>` +
                        `<td>${venta.nombreCliente}</td>` +
                        `<td>${venta.subtotal}</td>` +
                        `<td>${venta.iva}</td>` +
                        `<td>${venta.totalVenta}</td>` +
                        `<td>${venta.estado ? 'Cancelada' : 'Pendiente'}</td>` +
                        `<td>
                            <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editarVenta(${JSON.stringify(venta)})'>Editar</a>
                            <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminarVenta("${venta._id}")'>Eliminar</a>
                        </td></tr>`
                        console.log(venta)
                    body.innerHTML = mensaje;
                })
            })
    }
}

listarVentas()

const registrarVenta = async () => {
    let numeroVenta = document.getElementById('numeroVenta').value
    //let fecha = document.getElementById('fecha').value
    let nombreCliente = document.getElementById('nombreCliente').value
    let subtotal = document.getElementById('subtotal').value
    let iva = document.getElementById('iva').value
    let estado = document.getElementById('estado').value

    let venta = {
        numeroVenta: numeroVenta,
        //fecha: fecha,
        nombreCliente: nombreCliente,
        subtotal: subtotal,
        iva: iva,
        estado: estado
    }

    fetch(urlVenta, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(venta),
        headers:{ "Content-type": "application/json; charset=UTF-8" }
    })

    .then(response => response.json()) //Respuesta del metodo POST de la API
    .then(json =>{
        alert(json.mensaje)
        window.location.href='file:///C:/Users/USUARIO/OneDrive/Escritorio/consumoApi_proyectoNodeJs/listaVentas.html#'
    })
}

const editarVenta = (venta) =>{
    console.log(venta)
    document.getElementById('_id').value = ''
    document.getElementById('numeroVenta').value = ''
    //document.getElementById('fecha').value = ''
    document.getElementById('nombreCliente').value = ''
    document.getElementById('subtotal').value = ''
    document.getElementById('iva').value = ''
    //document.getElementById('totalVenta').value = ''
    document.getElementById('estado').value = ''


    document.getElementById('_id').value = venta._id
    document.getElementById('numeroVenta').value = venta.numeroVenta
    //document.getElementById('fecha').value = venta.fecha
    document.getElementById('nombreCliente').value = venta.nombreCliente
    document.getElementById('subtotal').value = venta.subtotal
    document.getElementById('iva').value = venta.iva
    //document.getElementById('totalVenta').value = venta.totalVenta
    document.getElementById('estado').value = venta.estado
}

const actualizarVenta = async() =>{
    //Capturar los datos enviados desde el formulario
    let numeroVenta = document.getElementById('numeroVenta').value
    //let fecha = document.getElementById('fecha').value
    let nombreCliente = document.getElementById('nombreCliente').value
    let subtotal = document.getElementById('subtotal').value
    let iva = document.getElementById('iva').value
    //let totalVenta = document.getElementById('totalVenta').value
    let estado = document.getElementById('estado').value

    let venta = {
        _id: document.getElementById('_id').value,
        numeroVenta: numeroVenta,
        //fecha: fecha,
        nombreCliente: nombreCliente,
        subtotal: subtotal,
        iva: iva,
        //totalVenta: totalVenta,
        estado: estado
    }

    fetch(urlVenta, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(venta),
        headers:{ "Content-type": "application/json; charset=UTF-8" }
    })

    .then(response => response.json()) //Respuesta del metodo POST de la API
    .then(json =>{
        alert(json.mensaje)
        window.location.href='file:///C:/Users/USUARIO/OneDrive/Escritorio/consumoApi_proyectoNodeJs/listaVentas.html#'
    })
}

const eliminarVenta = (_id) =>{
    if(confirm('Desea eliminar esta venta') == true){
        
        let venta = {
            _id: _id
        }
        fetch(urlVenta, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(venta),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json =>{
            alert(json.mensaje)
            window.location.href='file:///C:/Users/USUARIO/OneDrive/Escritorio/consumoApi_proyectoNodeJs/listaVentas.html#'
        })
    }
}

if (document.querySelector('#btnRegistrarVenta')) {
    document.querySelector('#btnRegistrarVenta')
        .addEventListener('click', registrarVenta)
}

if (document.querySelector('#btnActualizarVenta')) {
    document.querySelector('#btnActualizarVenta')
        .addEventListener('click', actualizarVenta)
}