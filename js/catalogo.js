// ==========================================
// AGREGAR PRODUCTOS AL CARRITO
// ==========================================

// Seleccionamos todos los botones de las tarjetas de productos
const botonesAgregar = document.querySelectorAll(".boton-agregar");

// Asignamos una acción a cada botón
botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        // Leemos los datos del botón seleccionado
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        // Recuperamos el carrito.
        // Si no existe, comenzamos con una lista vacía.
        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        // Buscamos si el producto ya existe
        const productoExistente = carrito.find(function (producto) {
            return producto.nombre === nombre;
        });

        if (productoExistente) {

            // Si existe, aumentamos su cantidad
            productoExistente.cantidad =
                (productoExistente.cantidad || 1) + 1;

        } else {

            // Si no existe, lo agregamos
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        // Guardamos el carrito
        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        // Mensaje de confirmación
        alert(nombre + " agregado al carrito.");
    });
});


// ==========================================
// CONTROL DE SESIÓN
// ==========================================

// Recuperamos al usuario que inició sesión
const usuarioActivo =
    JSON.parse(localStorage.getItem("usuarioActivo"));

// Buscamos la opción "Cerrar sesión"
const opcionCerrarSesion =
    document.getElementById("opcion-cerrar-sesion");

// Buscamos el botón de cerrar sesión
const botonCerrarSesion =
    document.getElementById("cerrar-sesion");


// Si existe un usuario conectado
if (usuarioActivo) {

    // Mostramos la opción Cerrar sesión
    if (opcionCerrarSesion) {
        opcionCerrarSesion.style.display = "list-item";
    }
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener(
        "click",
        function (event) {

            // Evitamos que el enlace haga su acción normal
            event.preventDefault();

            // Eliminamos solamente la sesión.
            // NO eliminamos carrito, usuarios ni órdenes.
            localStorage.removeItem("usuarioActivo");

            // Enviamos al usuario al Login
            window.location.replace(
                "login/login.html"
            );
        }
    );
}