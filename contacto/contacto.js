// Formulario
const formContacto = document.getElementById("formContacto");

// Campos
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const comentario = document.getElementById("comentario");

// Mensajes de error
const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorComentario = document.getElementById("errorComentario");


// Validar nombre
function validarNombre() {

    errorNombre.textContent = "";

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio";
        return false;
    }

    if (nombre.value.trim().length > 100) {
        errorNombre.textContent =
            "El nombre no puede superar los 100 caracteres";
        return false;
    }

    return true;
}


// Validar correo
function validarCorreo() {

    const correoIngresado = correo.value.trim().toLowerCase();

    errorCorreo.textContent = "";

    if (correoIngresado.length > 100) {
        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres";
        return false;
    }

    // Si escribe un correo, comprobamos el dominio
    if (correoIngresado !== "") {

        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];

        const dominioValido = dominiosPermitidos.some(function (dominio) {
            return correoIngresado.endsWith(dominio);
        });

        if (!dominioValido) {
            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
            return false;
        }
    }

    return true;
}


// Validar comentario
function validarComentario() {

    errorComentario.textContent = "";

    if (comentario.value.trim() === "") {
        errorComentario.textContent =
            "El comentario es obligatorio";
        return false;
    }

    if (comentario.value.trim().length > 500) {
        errorComentario.textContent =
            "El comentario no puede superar los 500 caracteres";
        return false;
    }

    return true;
}


// Validaciones en tiempo real
nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
comentario.addEventListener("input", validarComentario);


// Validar al enviar
formContacto.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombreValido = validarNombre();
    const correoValido = validarCorreo();
    const comentarioValido = validarComentario();

    if (nombreValido && correoValido && comentarioValido) {

        alert("Mensaje enviado correctamente");

        formContacto.reset();
    }
});