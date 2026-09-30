// ==========================================
// PROTEGER PANEL DEL VENDEDOR
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


// Volver a comprobar cuando el navegador
// recupera la página desde el historial.

window.addEventListener(
    "pageshow",
    function () {

        verificarSesionVendedor();
    }
);


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