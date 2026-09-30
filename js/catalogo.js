// Seleccionamos todos los botones de las tarjetas de productos
const botonesAgregar = document.querySelectorAll(".boton-agregar");

// Asignamos una acción a cada botón
botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        // Leemos los datos del botón seleccionado
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        // Recuperamos la versión actual del carrito.
        // Si no existe, comenzamos con una lista vacía.
        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        // Buscamos el producto por nombre
        const productoExistente = carrito.find(function (producto) {
            return producto.nombre === nombre;
        });

        if (productoExistente) {

            // Si ya estaba agregado, aumentamos su cantidad.
            // Si no tenía cantidad guardada, consideramos que tenía 1.
            productoExistente.cantidad =
                (productoExistente.cantidad || 1) + 1;

        } else {

            // Si es un producto nuevo, lo añadimos a la lista
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        // Convertimos la lista a texto y la guardamos en el navegador
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Confirmamos la acción al usuario
        alert(nombre + " agregado al carrito.");
    });
});