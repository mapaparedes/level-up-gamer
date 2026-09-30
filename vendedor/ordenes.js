// ==========================================
// PROTEGER PÁGINA DEL VENDEDOR
// ==========================================

function verificarSesionVendedor() {

    const usuarioActivo =
        JSON.parse(
            localStorage.getItem("usuarioActivo")
        );

    if (
        !usuarioActivo ||
        usuarioActivo.rol !== "Vendedor"
    ) {

        window.location.replace(
            "../login/login.html"
        );

        return false;
    }

    return true;
}


verificarSesionVendedor();


window.addEventListener(
    "pageshow",
    function () {

        verificarSesionVendedor();
    }
);


// ==========================================
// OBTENER ÓRDENES
// ==========================================

const ordenes =
    JSON.parse(
        localStorage.getItem("ordenes")
    ) || [];


const tablaOrdenes =
    document.getElementById("tablaOrdenes");

const sinOrdenes =
    document.getElementById("sinOrdenes");


// ==========================================
// MOSTRAR ÓRDENES
// ==========================================

function mostrarOrdenes() {

    tablaOrdenes.innerHTML = "";


    if (ordenes.length === 0) {

        sinOrdenes.style.display = "block";

        return;
    }


    sinOrdenes.style.display = "none";


    ordenes.forEach(function (orden) {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `
            <td>#${orden.id}</td>

            <td>
                ${orden.cliente}
            </td>

            <td>
                ${orden.fecha}
            </td>

            <td>
                $${Number(orden.total).toLocaleString("es-CL")}
            </td>

            <td class="estado">
                ${orden.estado}
            </td>

            <td>
                <button
                    class="btn-detalle"
                    onclick="verDetalle(${orden.id})"
                >
                    Ver detalle
                </button>
            </td>
        `;


        tablaOrdenes.appendChild(fila);
    });
}


// ==========================================
// VER DETALLE
// ==========================================

function verDetalle(id) {

    const orden =
        ordenes.find(function (orden) {

            return orden.id === id;
        });


    if (!orden) {
        return;
    }


    let detalle = "";

    orden.productos.forEach(
        function (producto) {

            detalle +=
                producto.nombre +
                " x" +
                producto.cantidad +
                "\n";
        }
    );


    alert(
        "ORDEN #" + orden.id +
        "\n\nCliente: " + orden.cliente +
        "\nFecha: " + orden.fecha +
        "\nEstado: " + orden.estado +
        "\n\nPRODUCTOS:\n" +
        detalle +
        "\nTOTAL: $" +
        Number(orden.total)
            .toLocaleString("es-CL")
    );
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

const botonCerrarSesion =
    document.getElementById("cerrar-sesion");


botonCerrarSesion.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        localStorage.removeItem(
            "usuarioActivo"
        );

        window.location.replace(
            "../login/login.html"
        );
    }
);


// ==========================================
// INICIAR
// ==========================================

mostrarOrdenes();