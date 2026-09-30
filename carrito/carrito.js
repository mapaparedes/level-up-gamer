// ==========================================
// CARRITO DE COMPRAS - LEVEL-UP GAMER
// ==========================================

// Recuperamos el carrito guardado
let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


// Elementos del HTML
const listaCarrito =
    document.getElementById("lista-carrito");

const totalCarrito =
    document.getElementById("total-carrito");

const btnComprar =
    document.getElementById("btn-comprar");


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

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


    carrito.forEach((producto, indice) => {

        const cantidad =
            producto.cantidad || 1;

        const subtotal =
            producto.precio * cantidad;

        total += subtotal;


        const productoHTML =
            document.createElement("div");

        productoHTML.classList.add(
            "producto-carrito"
        );


        productoHTML.innerHTML = `

            <div class="producto-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Precio:
                    $${producto.precio.toLocaleString("es-CL")}
                </p>


                <div class="cantidad">

                    <span>Cantidad:</span>

                    <button
                        onclick="disminuirCantidad(${indice})"
                    >
                        -
                    </button>

                    <span>
                        ${cantidad}
                    </span>

                    <button
                        onclick="aumentarCantidad(${indice})"
                    >
                        +
                    </button>

                </div>


                <p>
                    Subtotal:
                    $${subtotal.toLocaleString("es-CL")}
                </p>

            </div>


            <button
                class="btn-eliminar"
                onclick="eliminarProducto(${indice})"
            >
                Eliminar
            </button>
        `;


        listaCarrito.appendChild(
            productoHTML
        );
    });


    totalCarrito.textContent =
        "$" + total.toLocaleString("es-CL");
}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();
}


// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

function agregarAlCarrito(producto) {

    const productoExistente =
        carrito.find(
            item =>
                item.nombre === producto.nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1
        });
    }


    guardarCarrito();

    mostrarCarrito();
}


// ==========================================
// AUMENTAR CANTIDAD
// ==========================================

function aumentarCantidad(indice) {

    carrito[indice].cantidad++;

    guardarCarrito();

    mostrarCarrito();
}


// ==========================================
// DISMINUIR CANTIDAD
// ==========================================

function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    } else {

        carrito.splice(indice, 1);
    }


    guardarCarrito();

    mostrarCarrito();
}


// ==========================================
// CALCULAR TOTAL
// ==========================================

function calcularTotalCompra() {

    let total = 0;


    carrito.forEach(function (producto) {

        const cantidad =
            producto.cantidad || 1;

        total +=
            producto.precio * cantidad;
    });


    return total;
}


// ==========================================
// FINALIZAR COMPRA
// ==========================================

btnComprar.addEventListener(
    "click",
    function () {


        // Verificar carrito
        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;
        }


        // ==========================================
        // VERIFICAR CLIENTE
        // ==========================================

        const usuarioActivo =
            JSON.parse(
                localStorage.getItem(
                    "usuarioActivo"
                )
            );


        if (!usuarioActivo) {

            alert(
                "Debes iniciar sesión para finalizar la compra."
            );

            window.location.href =
                "../login/login.html";

            return;
        }


        // ==========================================
        // OBTENER ÓRDENES EXISTENTES
        // ==========================================

        const ordenes =
            JSON.parse(
                localStorage.getItem("ordenes")
            ) || [];


        // ==========================================
        // CALCULAR TOTAL
        // ==========================================

        const total =
            calcularTotalCompra();


        // ==========================================
        // GENERAR ID
        // ==========================================

        let nuevoId = 1;


        if (ordenes.length > 0) {

            nuevoId =
                Math.max(
                    ...ordenes.map(
                        orden => Number(orden.id)
                    )
                ) + 1;
        }


        // ==========================================
        // FECHA
        // ==========================================

        const fecha =
            new Date().toLocaleString(
                "es-CL"
            );


        // ==========================================
        // CREAR ORDEN
        // ==========================================

        const nuevaOrden = {

            id: nuevoId,

            cliente:
                usuarioActivo.nombre +
                " " +
                (usuarioActivo.apellidos || ""),

            correo:
                usuarioActivo.correo,

            fecha: fecha,

            productos:
                carrito.map(function (producto) {

                    return {

                        nombre:
                            producto.nombre,

                        precio:
                            producto.precio,

                        cantidad:
                            producto.cantidad || 1
                    };
                }),

            total: total,

            estado: "Pendiente"
        };


        // ==========================================
        // GUARDAR ORDEN
        // ==========================================

        ordenes.push(
            nuevaOrden
        );


        localStorage.setItem(
            "ordenes",
            JSON.stringify(ordenes)
        );


        // ==========================================
        // VACIAR CARRITO
        // ==========================================

        carrito = [];

        guardarCarrito();

        mostrarCarrito();


        // ==========================================
        // MENSAJE
        // ==========================================

        alert(
            "Compra realizada correctamente.\n" +
            "Orden #" + nuevoId
        );
    }
);


// ==========================================
// MOSTRAR CARRITO AL CARGAR
// ==========================================

mostrarCarrito();