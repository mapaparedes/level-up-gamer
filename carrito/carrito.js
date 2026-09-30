// Recuperamos el carrito guardado en localStorage.
// Si todavía no existe, usamos un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del HTML
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnComprar = document.getElementById("btn-comprar");

// Muestra los productos guardados en el carrito
function mostrarCarrito() {

    // Limpiamos el contenido antes de volver a mostrarlo
    listaCarrito.innerHTML = "";

    // Si no existen productos
    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p id="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

        totalCarrito.textContent = "$0";
        return;
    }

    let total = 0;

    // Recorremos todos los productos del carrito
    carrito.forEach((producto, indice) => {

        const cantidad = producto.cantidad || 1;
        const subtotal = producto.precio * cantidad;

        total += subtotal;

        const productoHTML = document.createElement("div");
        productoHTML.classList.add("producto-carrito");

        productoHTML.innerHTML = `
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toLocaleString("es-CL")}</p>
                <div class="cantidad">
                <span>Cantidad:</span>

                <button onclick="disminuirCantidad(${indice})">
                 -
                </button>

                <span>${cantidad}</span>

                <button onclick="aumentarCantidad(${indice})">
                +
    </button>
</div>
                <p>Subtotal: $${subtotal.toLocaleString("es-CL")}</p>
            </div>

            <button class="btn-eliminar" onclick="eliminarProducto(${indice})">
                Eliminar
            </button>
        `;

        listaCarrito.appendChild(productoHTML);
    });

    // Mostramos el total de la compra
    totalCarrito.textContent =
        "$" + total.toLocaleString("es-CL");
}


// Elimina un producto del carrito
function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();
    mostrarCarrito();
}


// Guarda el carrito en el navegador
function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
// Agrega un producto al carrito
function agregarAlCarrito(producto) {

    // Buscamos si el producto ya está en el carrito
    const productoExistente = carrito.find(
        item => item.nombre === producto.nombre
    );

    // Si ya existe, aumentamos su cantidad
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {

        // Si no existe, lo agregamos con cantidad 1
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    mostrarCarrito();
}

// Aumenta la cantidad de un producto
function aumentarCantidad(indice) {

    carrito[indice].cantidad++;

    guardarCarrito();
    mostrarCarrito();
}


// Disminuye la cantidad de un producto
function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }

    guardarCarrito();
    mostrarCarrito();
}


// Simulación de finalizar compra
btnComprar.addEventListener("click", function () {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    alert("Compra realizada correctamente.");

    carrito = [];

    guardarCarrito();
    mostrarCarrito();
});


// Mostramos el carrito al cargar la página
mostrarCarrito();