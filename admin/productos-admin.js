// ===============================
// PROTEGER PÁGINA DE PRODUCTOS
// ===============================

function verificarSesionAdmin() {

    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    if (!usuarioActivo || usuarioActivo.rol !== "Administrador") {

        window.location.replace("../login/login.html");
        return false;
    }

    return true;
}

verificarSesionAdmin();

window.addEventListener("pageshow", function () {
    verificarSesionAdmin();
});


// ===============================
// PRODUCTOS INICIALES
// ===============================

const productosIniciales = [

    {
        nombre: "Catan",
        precio: 29990,
        stock: 20,
        stockCritico: 5,
        categoria: "Juegos",
        descripcion:
            "Juego de estrategia para compartir con amigos o en familia.",
        imagen: ""
    },

    {
        nombre: "Carcassonne",
        precio: 24990,
        stock: 15,
        stockCritico: 5,
        categoria: "Juegos",
        descripcion:
            "Juego de estrategia basado en ciudades y caminos medievales.",
        imagen: ""
    },

    {
        nombre: "PlayStation 5",
        precio: 549990,
        stock: 8,
        stockCritico: 3,
        categoria: "Consolas",
        descripcion:
            "Consola PlayStation 5 con control DualSense.",
        imagen: ""
    },

    {
        nombre: "Silla Gamer Secretlab Titan",
        precio: 349990,
        stock: 6,
        stockCritico: 2,
        categoria: "Sillas Gamer",
        descripcion:
            "Silla gamer reclinable con apoyabrazos ajustables.",
        imagen: ""
    },

    {
        nombre: "Mouse Gamer Logitech G502 HERO",
        precio: 49990,
        stock: 25,
        stockCritico: 5,
        categoria: "Accesorios",
        descripcion:
            "Mouse gamer de alta precisión con botones personalizables.",
        imagen: ""
    },

    {
        nombre: "Auriculares Gamer HyperX Cloud II",
        precio: 79990,
        stock: 12,
        stockCritico: 4,
        categoria: "Accesorios",
        descripcion:
            "Auriculares gamer con micrófono desmontable.",
        imagen: ""
    }

];


// ===============================
// RECUPERAR PRODUCTOS
// ===============================

let productos =
    JSON.parse(localStorage.getItem("productosAdmin"));

if (!productos) {

    productos = productosIniciales;

    guardarProductos();
}


// Compatibilidad con productos que ya estaban
// guardados antes de agregar Stock.
productos.forEach(function (producto) {

    if (producto.stock === undefined) {
        producto.stock = 0;
    }

    if (producto.stockCritico === undefined) {
        producto.stockCritico = "";
    }

    if (producto.imagen === undefined) {
        producto.imagen = "";
    }
});

guardarProductos();


// ===============================
// ELEMENTOS DEL FORMULARIO
// ===============================

const formulario =
    document.getElementById("form-producto");

const nombre =
    document.getElementById("nombre");

const descripcion =
    document.getElementById("descripcion");

const precio =
    document.getElementById("precio");

const stock =
    document.getElementById("stock");

const stockCritico =
    document.getElementById("stock-critico");

const categoria =
    document.getElementById("categoria");

const imagen =
    document.getElementById("imagen");

const indiceProducto =
    document.getElementById("indice-producto");

const tablaProductos =
    document.getElementById("tabla-productos");

const tituloFormulario =
    document.getElementById("titulo-formulario");

const btnGuardar =
    document.getElementById("btn-guardar");

const btnCancelar =
    document.getElementById("btn-cancelar");


// ===============================
// GUARDAR PRODUCTOS
// ===============================

function guardarProductos() {

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );
}


// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos() {

    tablaProductos.innerHTML = "";

    productos.forEach(function (producto, indice) {

        const fila =
            document.createElement("tr");


        // Mostrar alerta si el stock llegó al nivel crítico
        let textoStock = producto.stock;

        if (
            producto.stockCritico !== "" &&
            producto.stock <= producto.stockCritico
        ) {

            textoStock =
                producto.stock + " ⚠️ STOCK CRÍTICO";
        }


        fila.innerHTML = `

            <td>
                ${producto.nombre}
            </td>

            <td>
                $${Number(producto.precio).toLocaleString("es-CL")}
            </td>

            <td>
                ${textoStock}
            </td>

            <td>
                ${
                    producto.stockCritico === ""
                    ? "No definido"
                    : producto.stockCritico
                }
            </td>

            <td>
                ${producto.categoria}
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarProducto(${indice})"
                >
                    Editar
                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarProducto(${indice})"
                >
                    Eliminar
                </button>

            </td>
        `;

        tablaProductos.appendChild(fila);
    });
}


// ===============================
// LIMPIAR ERRORES
// ===============================

function limpiarErrores() {

    document.getElementById("error-nombre").textContent = "";

    document.getElementById("error-descripcion").textContent = "";

    document.getElementById("error-precio").textContent = "";

    document.getElementById("error-stock").textContent = "";

    document.getElementById("error-stock-critico").textContent = "";

    document.getElementById("error-categoria").textContent = "";

    document.getElementById("error-imagen").textContent = "";
}


// ===============================
// VALIDAR FORMULARIO
// ===============================

function validarFormulario() {

    limpiarErrores();

    let formularioValido = true;


    // NOMBRE
    if (nombre.value.trim() === "") {

        document.getElementById("error-nombre").textContent =
            "El nombre del producto es obligatorio.";

        formularioValido = false;

    } else if (nombre.value.trim().length > 100) {

        document.getElementById("error-nombre").textContent =
            "El nombre no puede superar los 100 caracteres.";

        formularioValido = false;
    }


    // DESCRIPCIÓN
    // Es opcional, pero si se escribe no puede superar 500.
    if (descripcion.value.length > 500) {

        document.getElementById("error-descripcion").textContent =
            "La descripción no puede superar los 500 caracteres.";

        formularioValido = false;
    }


    // PRECIO
    if (precio.value.trim() === "") {

        document.getElementById("error-precio").textContent =
            "El precio es obligatorio.";

        formularioValido = false;

    } else if (Number(precio.value) < 0) {

        document.getElementById("error-precio").textContent =
            "El precio no puede ser menor a 0.";

        formularioValido = false;
    }


    // STOCK
    if (stock.value.trim() === "") {

        document.getElementById("error-stock").textContent =
            "El stock es obligatorio.";

        formularioValido = false;

    } else if (
        Number(stock.value) < 0 ||
        !Number.isInteger(Number(stock.value))
    ) {

        document.getElementById("error-stock").textContent =
            "El stock debe ser un número entero igual o mayor a 0.";

        formularioValido = false;
    }


    // STOCK CRÍTICO
    // Es opcional.
    if (stockCritico.value.trim() !== "") {

        if (
            Number(stockCritico.value) < 0 ||
            !Number.isInteger(Number(stockCritico.value))
        ) {

            document.getElementById(
                "error-stock-critico"
            ).textContent =
                "El stock crítico debe ser un número entero igual o mayor a 0.";

            formularioValido = false;
        }
    }


    // CATEGORÍA
    if (categoria.value === "") {

        document.getElementById("error-categoria").textContent =
            "Seleccione una categoría.";

        formularioValido = false;
    }


    return formularioValido;
}


// ===============================
// CREAR O EDITAR PRODUCTO
// ===============================

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validarFormulario()) {
            return;
        }


        const productoAnterior =
            indiceProducto.value !== ""
                ? productos[Number(indiceProducto.value)]
                : null;


        const producto = {

            nombre:
                nombre.value.trim(),

            descripcion:
                descripcion.value.trim(),

            precio:
                Number(precio.value),

            stock:
                Number(stock.value),

            stockCritico:
                stockCritico.value.trim() === ""
                    ? ""
                    : Number(stockCritico.value),

            categoria:
                categoria.value,

            // Por ahora guardamos solamente el nombre
            // del archivo seleccionado.
            imagen:
                imagen.files.length > 0
                    ? imagen.files[0].name
                    : productoAnterior?.imagen || ""
        };


        // EDITAR
        if (indiceProducto.value !== "") {

            const indice =
                Number(indiceProducto.value);

            productos[indice] =
                producto;

            alert(
                "Producto actualizado correctamente."
            );

        }

        // CREAR
        else {

            productos.push(producto);

            alert(
                "Producto agregado correctamente."
            );
        }


        guardarProductos();

        mostrarProductos();

        limpiarFormulario();
    }
);


// ===============================
// EDITAR PRODUCTO
// ===============================

function editarProducto(indice) {

    const producto =
        productos[indice];


    nombre.value =
        producto.nombre;

    descripcion.value =
        producto.descripcion || "";

    precio.value =
        producto.precio;

    stock.value =
        producto.stock;

    stockCritico.value =
        producto.stockCritico ?? "";

    categoria.value =
        producto.categoria;

    indiceProducto.value =
        indice;


    /*
       Por seguridad el navegador no permite
       colocar automáticamente un archivo
       dentro de un input type="file".
    */


    tituloFormulario.textContent =
        "Editar producto";

    btnGuardar.textContent =
        "Guardar cambios";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(indice) {

    const confirmar =
        confirm(
            "¿Deseas eliminar " +
            productos[indice].nombre +
            "?"
        );


    if (!confirmar) {
        return;
    }


    productos.splice(indice, 1);

    guardarProductos();

    mostrarProductos();
}


// ===============================
// LIMPIAR FORMULARIO
// ===============================

function limpiarFormulario() {

    formulario.reset();

    indiceProducto.value = "";

    tituloFormulario.textContent =
        "Nuevo producto";

    btnGuardar.textContent =
        "Guardar producto";

    limpiarErrores();
}


// ===============================
// CANCELAR EDICIÓN
// ===============================

btnCancelar.addEventListener(
    "click",
    function () {

        limpiarFormulario();
    }
);


// ===============================
// MOSTRAR AL CARGAR
// ===============================

mostrarProductos();

// ==========================================
// CERRAR SESIÓN
// ==========================================

const btnCerrarSesion =
    document.getElementById("cerrar-sesion");

if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            // Eliminar la sesión
            localStorage.removeItem("usuarioActivo");

            // Volver al login
            window.location.replace(
                "../login/login.html"
            );
        }
    );
}