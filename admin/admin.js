// ===============================
// VERIFICAR SESIÓN DE ADMIN
// ===============================

function verificarSesionAdmin() {

    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    // Si no inició sesión o no es administrador
    if (!usuarioActivo || usuarioActivo.rol !== "Administrador") {

        window.location.replace("../login/login.html");

        return false;
    }

    return true;
}


// Verificar cuando entramos al Admin
verificarSesionAdmin();


// Verificar nuevamente si usamos Atrás/Adelante
window.addEventListener("pageshow", function () {

    verificarSesionAdmin();

});


// ===============================
// CERRAR SESIÓN
// ===============================

const btnCerrarSesion =
    document.getElementById("cerrar-sesion");

if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            // Eliminamos la sesión
            localStorage.removeItem("usuarioActivo");

            // Enviamos al login
            window.location.replace("../login/login.html");
        }
    );
}