// Productos disponibles en la tienda
const productos = {

    catan: {
        nombre: "Catan",
        precio: 29990,
        imagen: "../img/catan.jpg",
        descripcion:
            "Juego de estrategia donde los jugadores compiten por colonizar la isla de Catan. Ideal para compartir con amigos o en familia."
    },

    carcassonne: {
        nombre: "Carcassonne",
        precio: 24990,
        imagen: "../img/carcassonne.jpg",
        descripcion:
            "Construye un paisaje medieval colocando fichas de ciudades, caminos y campos. Un juego de estrategia ideal para compartir con amigos o en familia."
    },

    ps5: {
        nombre: "PlayStation 5",
        precio: 549990,
        imagen: "../img/playstation5.jpg",
        descripcion:
            "Disfruta tus juegos favoritos con gráficos envolventes y tiempos de carga rápidos. Incluye un control DualSense."
    },

    silla: {
        nombre: "Silla Gamer Secretlab Titan",
        precio: 349990,
        imagen: "../img/silla-gamer.jpg",
        descripcion:
            "Completa tu espacio gamer con una silla de respaldo reclinable y apoyabrazos ajustables para mayor comodidad."
    },

    mouse: {
        nombre: "Mouse Gamer Logitech G502 HERO",
        precio: 49990,
        imagen: "../img/mouse-logitech.jpg",
        descripcion:
            "Mejora el control en tus partidas con un mouse de alta precisión y botones personalizables."
    },

    audifonos: {
        nombre: "Auriculares Gamer HyperX Cloud II",
        precio: 79990,
        imagen: "../img/audifonos-hyperx.jpg",
        descripcion:
            "Disfruta tus partidas con almohadillas cómodas y un micrófono desmontable para comunicarte con tu equipo."
    }
};


// Leemos el producto desde la URL
const parametros = new URLSearchParams(window.location.search);

const codigoProducto = parametros.get("producto");


// Buscamos el producto
const producto = productos[codigoProducto];


// Elementos del HTML
const nombre = document.getElementById("producto-nombre");
const descripcion = document.getElementById("producto-descripcion");
const precio = document.getElementById("producto-precio");
const imagen = document.getElementById("producto-imagen");
const btnAgregar = document.getElementById("btn-agregar");


// Mostramos la información del producto
if (producto) {

    nombre.textContent = producto.nombre;

    descripcion.textContent = producto.descripcion;

    precio.textContent =
        "$" + producto.precio.toLocaleString("es-CL") + " CLP";

    imagen.src = producto.imagen;

    imagen.alt = producto.nombre;

} else {

    nombre.textContent = "Producto no encontrado";

    descripcion.textContent =
        "El producto seleccionado no existe.";

    precio.textContent = "";

    imagen.style.display = "none";

    btnAgregar.style.display = "none";
}


// Agregar producto al carrito
btnAgregar.addEventListener("click", function () {

    if (!producto) {
        return;
    }

    const carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];


    const productoExistente = carrito.find(function (item) {

        return item.nombre === producto.nombre;

    });


    if (productoExistente) {

        productoExistente.cantidad =
            (productoExistente.cantidad || 1) + 1;

    } else {

        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });

    }


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    alert(producto.nombre + " agregado al carrito.");

});