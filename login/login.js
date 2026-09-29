// Obtenemos el formulario
const formLogin = document.getElementById("formLogin");

// Obtenemos los campos
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("password");

// Mensajes de error
const errorCorreo = document.getElementById("errorCorreo");
const errorPassword = document.getElementById("errorPassword");


// Validar correo mientras el usuario escribe
inputCorreo.addEventListener("input", function () {

    const correo = inputCorreo.value.trim();

    errorCorreo.textContent = "";

    if (correo === "") {

        errorCorreo.textContent =
            "El correo es obligatorio";

    } else if (correo.length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres";

    } else {

        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];

        const dominioValido = dominiosPermitidos.some(function (dominio) {
            return correo.toLowerCase().endsWith(dominio);
        });

        if (!dominioValido) {

            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
        }
    }
});


// Validar contraseña mientras el usuario escribe
inputPassword.addEventListener("input", function () {

    const password = inputPassword.value;

    errorPassword.textContent = "";

    if (password === "") {

        errorPassword.textContent =
            "La contraseña es obligatoria";

    } else if (password.length < 4 || password.length > 10) {

        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";
    }
});


// Validar todo al presionar Iniciar Sesión
formLogin.addEventListener("submit", function (event) {

    // Evita que la página se recargue
    event.preventDefault();

    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    let formularioValido = true;


    // Validar correo
    if (correo === "") {

        errorCorreo.textContent =
            "El correo es obligatorio";

        formularioValido = false;

    } else if (correo.length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres";

        formularioValido = false;

    } else {

        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];

        const dominioValido = dominiosPermitidos.some(function (dominio) {
            return correo.toLowerCase().endsWith(dominio);
        });

        if (!dominioValido) {

            errorCorreo.textContent =
                "Correo no válido";

            formularioValido = false;
        }
    }


    // Validar contraseña
    if (password === "") {

        errorPassword.textContent =
            "La contraseña es obligatoria";

        formularioValido = false;

    } else if (password.length < 4 || password.length > 10) {

        errorPassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";

        formularioValido = false;
    }


    // Si todo está correcto
    if (formularioValido) {

        alert("Inicio de sesión correcto");
    }
});