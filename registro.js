const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", function(event) {

    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const errorNombre = document.getElementById("errorNombre");

    // Limpiamos el mensaje anterior
    errorNombre.textContent = "";

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

    alert("Nombre válido");
});