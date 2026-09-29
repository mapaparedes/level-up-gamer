const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", function(event) {

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const errorNombre = document.getElementById("errorNombre");
    const apellidos = document.getElementById("apellidos").value.trim();
    const errorApellidos = document.getElementById("errorApellidos");
    const correo = document.getElementById("correo").value.trim();
    const errorCorreo = document.getElementById("errorCorreo");

    // Limpiamos el mensaje anterior
    errorNombre.textContent = "";
    errorApellidos.textContent = "";
    errorCorreo.textContent = "";     

    // Validar que el nombre sea obligatorio
    if (nombre === "") {
        errorNombre.textContent = "El nombre es obligatorio";
        return;
    }

    // Validar máximo 50 caracteres
    if (nombre.length > 50) {
        errorNombre.textContent = "El nombre no puede superar los 50 caracteres";
        return;
    }

    // Validar apellidos
    if (apellidos === "") {
    errorApellidos.textContent = "Los apellidos son obligatorios";
    return;
    }

    if (apellidos.length > 100) {
    errorApellidos.textContent = "Los apellidos no pueden superar los 100 caracteres";
    return;
    }// Validar correo
    if (correo === "") {
    errorCorreo.textContent = "El correo es obligatorio";
    return;
    }

    if (correo.length > 100) {
    errorCorreo.textContent = "El correo no puede superar los 100 caracteres";
    return;
    }

    const dominiosPermitidos = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
    ];

    const dominioValido = dominiosPermitidos.some(function(dominio) {
    return correo.toLowerCase().endsWith(dominio);
    });

    if (!dominioValido) {
    errorCorreo.textContent =
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    return;
    }
    alert("Nombre válido");


});