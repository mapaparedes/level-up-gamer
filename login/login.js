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


// Validar al iniciar sesión
formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    errorCorreo.textContent = "";
    errorPassword.textContent = "";

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


    // Si las validaciones fallan, detenemos el proceso
    if (!formularioValido) {
        return;
    }


    // Obtenemos los usuarios creados desde el administrador
    const usuarios =
        JSON.parse(localStorage.getItem("usuariosAdmin")) || [];


    // Buscamos un usuario que coincida con correo y contraseña
    const usuarioEncontrado = usuarios.find(function (usuario) {

        return (
            usuario.correo.toLowerCase() === correo.toLowerCase() &&
            usuario.password === password
        );

    });


    // Si no existe
    if (!usuarioEncontrado) {

        errorPassword.textContent =
            "Correo o contraseña incorrectos";

        return;
    }


    // Guardamos la sesión del usuario
    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioEncontrado)
    );


    alert(
        "Bienvenido " + usuarioEncontrado.nombre
    );


  // Redirección según el rol
if (usuarioEncontrado.rol === "Administrador") {

    window.location.href =
        "../admin/admin.html";

} else if (usuarioEncontrado.rol === "Vendedor") {

    window.location.href =
        "../vendedor/vendedor.html";

} else {

    // Cliente
    window.location.href =
        "../index.html";
}
});