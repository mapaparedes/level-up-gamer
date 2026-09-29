const formulario = document.getElementById("formRegistro");

function validarRun(run) {

    // Debe tener entre 7 y 9 caracteres
    if (run.length < 7 || run.length > 9) {
        return false;
    }

    // Solo números y K como dígito verificador
    if (!/^[0-9]+[0-9kK]$/.test(run)) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = 11 - (suma % 11);

    let dvCalculado;

    if (resto === 11) {
        dvCalculado = "0";
    } else if (resto === 10) {
        dvCalculado = "K";
    } else {
        dvCalculado = resto.toString();
    }

    return dvCalculado === dvIngresado;
}

formulario.addEventListener("submit", function(event) {

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const errorNombre = document.getElementById("errorNombre");
    const apellidos = document.getElementById("apellidos").value.trim();
    const errorApellidos = document.getElementById("errorApellidos");
    const correo = document.getElementById("correo").value.trim();
    const errorCorreo = document.getElementById("errorCorreo");
    const run = document.getElementById("run").value.trim();
    const errorRun = document.getElementById("errorRun");

    // Limpiamos el mensaje anterior
    errorNombre.textContent = "";
    errorApellidos.textContent = "";
    errorCorreo.textContent = "";     
    errorRun.textContent = "";
    
    // Validar RUN
    if (run === "") {
    errorRun.textContent = "El RUN es obligatorio";
    return;
    }

    if (run.includes(".") || run.includes("-")) {
    errorRun.textContent = "El RUN debe ingresarse sin puntos ni guion";
    return;
    }

    if (!validarRun(run)) {
    errorRun.textContent = "Ingrese un RUN chileno válido";
    return;
    }

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