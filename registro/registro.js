// ==========================================
// REGIONES Y COMUNAS
// ==========================================

const regionesComunas = {

    "Metropolitana": [
        "Santiago",
        "Puente Alto",
        "Maipú",
        "La Florida",
        "Las Condes"
    ],

    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "Coronel"
    ]
};


// ==========================================
// CARGAR REGIONES
// ==========================================

const region = document.getElementById("region");
const comuna = document.getElementById("comuna");

for (const nombreRegion in regionesComunas) {

    const opcion = document.createElement("option");

    opcion.value = nombreRegion;
    opcion.textContent = nombreRegion;

    region.appendChild(opcion);
}


// ==========================================
// CARGAR COMUNAS
// ==========================================

region.addEventListener("change", function () {

    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada = region.value;

    if (regionSeleccionada !== "") {

        regionesComunas[regionSeleccionada].forEach(
            function (nombreComuna) {

                const opcion =
                    document.createElement("option");

                opcion.value = nombreComuna;
                opcion.textContent = nombreComuna;

                comuna.appendChild(opcion);
            }
        );
    }
});


// ==========================================
// VALIDAR RUN CHILENO
// ==========================================

function validarRun(run) {

    if (run.length < 7 || run.length > 9) {
        return false;
    }

    // No permite puntos ni guion
    if (run.includes(".") || run.includes("-")) {
        return false;
    }

    // Solo números y K
    if (!/^[0-9]+[0-9kK]$/.test(run)) {
        return false;
    }

    const cuerpo = run.slice(0, -1);

    const dvIngresado =
        run.slice(-1).toUpperCase();

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma +=
            parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto =
        11 - (suma % 11);

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


// ==========================================
// VALIDAR CORREO
// ==========================================

function correoPermitido(correo) {

    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com"
    ];

    return dominiosPermitidos.some(
        function (dominio) {

            return correo
                .toLowerCase()
                .endsWith(dominio);
        }
    );
}


// ==========================================
// FORMULARIO
// ==========================================

const formulario =
    document.getElementById("formRegistro");


formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ==========================================
        // OBTENER DATOS
        // ==========================================

        const run =
            document.getElementById("run").value.trim();

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellidos =
            document.getElementById("apellidos").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmarPassword =
            document.getElementById("confirmarPassword").value;

        const fechaNacimiento =
            document.getElementById("fechaNacimiento").value;

        const regionSeleccionada =
            document.getElementById("region").value;

        const comunaSeleccionada =
            document.getElementById("comuna").value;

        const direccion =
            document.getElementById("direccion").value.trim();


        // ==========================================
        // MENSAJES DE ERROR
        // ==========================================

        const errorRun =
            document.getElementById("errorRun");

        const errorNombre =
            document.getElementById("errorNombre");

        const errorApellidos =
            document.getElementById("errorApellidos");

        const errorCorreo =
            document.getElementById("errorCorreo");

        const errorPassword =
            document.getElementById("errorPassword");

        const errorConfirmarPassword =
            document.getElementById("errorConfirmarPassword");

        const errorFecha =
            document.getElementById("errorFecha");

        const errorRegion =
            document.getElementById("errorRegion");

        const errorComuna =
            document.getElementById("errorComuna");

        const errorDireccion =
            document.getElementById("errorDireccion");


        // LIMPIAR ERRORES

        errorRun.textContent = "";
        errorNombre.textContent = "";
        errorApellidos.textContent = "";
        errorCorreo.textContent = "";
        errorPassword.textContent = "";
        errorConfirmarPassword.textContent = "";
        errorFecha.textContent = "";
        errorRegion.textContent = "";
        errorComuna.textContent = "";
        errorDireccion.textContent = "";


        // ==========================================
        // VALIDAR RUN
        // ==========================================

        if (run === "") {

            errorRun.textContent =
                "El RUN es obligatorio";

            return;
        }

        if (run.includes(".") || run.includes("-")) {

            errorRun.textContent =
                "El RUN debe ingresarse sin puntos ni guion";

            return;
        }

        if (!validarRun(run)) {

            errorRun.textContent =
                "Ingrese un RUN chileno válido";

            return;
        }


        // ==========================================
        // VALIDAR NOMBRE
        // ==========================================

        if (nombre === "") {

            errorNombre.textContent =
                "El nombre es obligatorio";

            return;
        }

        if (nombre.length > 50) {

            errorNombre.textContent =
                "El nombre no puede superar los 50 caracteres";

            return;
        }


        // ==========================================
        // VALIDAR APELLIDOS
        // ==========================================

        if (apellidos === "") {

            errorApellidos.textContent =
                "Los apellidos son obligatorios";

            return;
        }

        if (apellidos.length > 100) {

            errorApellidos.textContent =
                "Los apellidos no pueden superar los 100 caracteres";

            return;
        }


        // ==========================================
        // VALIDAR CORREO
        // ==========================================

        if (correo === "") {

            errorCorreo.textContent =
                "El correo es obligatorio";

            return;
        }

        if (correo.length > 100) {

            errorCorreo.textContent =
                "El correo no puede superar los 100 caracteres";

            return;
        }

        if (!correoPermitido(correo)) {

            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";

            return;
        }


        // ==========================================
        // VALIDAR CONTRASEÑA
        // ==========================================

        if (password === "") {

            errorPassword.textContent =
                "La contraseña es obligatoria";

            return;
        }

        if (password.length < 4 ||
            password.length > 10) {

            errorPassword.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres";

            return;
        }


        // ==========================================
        // CONFIRMAR CONTRASEÑA
        // ==========================================

        if (confirmarPassword === "") {

            errorConfirmarPassword.textContent =
                "Debe confirmar la contraseña";

            return;
        }

        if (password !== confirmarPassword) {

            errorConfirmarPassword.textContent =
                "Las contraseñas no coinciden";

            return;
        }


        // ==========================================
        // VALIDAR EDAD
        // ==========================================

        if (fechaNacimiento === "") {

            errorFecha.textContent =
                "Ingrese su fecha de nacimiento";

            return;
        }

        const fechaNac =
            new Date(fechaNacimiento + "T00:00:00");

        const hoy =
            new Date();

        let edad =
            hoy.getFullYear() -
            fechaNac.getFullYear();

        const mes =
            hoy.getMonth() -
            fechaNac.getMonth();

        if (
            mes < 0 ||
            (
                mes === 0 &&
                hoy.getDate() < fechaNac.getDate()
            )
        ) {

            edad--;
        }

        if (edad < 18) {

            errorFecha.textContent =
                "Debes ser mayor de 18 años para registrarte";

            return;
        }


        // ==========================================
        // VALIDAR REGIÓN
        // ==========================================

        if (regionSeleccionada === "") {

            errorRegion.textContent =
                "Debe seleccionar una región";

            return;
        }


        // ==========================================
        // VALIDAR COMUNA
        // ==========================================

        if (comunaSeleccionada === "") {

            errorComuna.textContent =
                "Debe seleccionar una comuna";

            return;
        }


        // ==========================================
        // VALIDAR DIRECCIÓN
        // ==========================================

        if (direccion === "") {

            errorDireccion.textContent =
                "La dirección es obligatoria";

            return;
        }

        if (direccion.length > 300) {

            errorDireccion.textContent =
                "La dirección no puede superar los 300 caracteres";

            return;
        }


        // ==========================================
        // OBTENER USUARIOS GUARDADOS
        // ==========================================

        let usuarios =
            JSON.parse(
                localStorage.getItem("usuariosAdmin")
            ) || [];


        // ==========================================
        // VERIFICAR RUN REPETIDO
        // ==========================================

        const runExiste =
            usuarios.some(function (usuario) {

                return usuario.run &&
                    usuario.run.toUpperCase() ===
                    run.toUpperCase();
            });

        if (runExiste) {

            errorRun.textContent =
                "Este RUN ya está registrado";

            return;
        }


        // ==========================================
        // VERIFICAR CORREO REPETIDO
        // ==========================================

        const correoExiste =
            usuarios.some(function (usuario) {

                return usuario.correo
                    .toLowerCase() ===
                    correo.toLowerCase();
            });

        if (correoExiste) {

            errorCorreo.textContent =
                "Este correo ya está registrado";

            return;
        }


        // ==========================================
        // CREAR USUARIO
        // ==========================================

        const nuevoUsuario = {

            run: run,

            nombre: nombre,

            apellidos: apellidos,

            correo: correo,

            password: password,

            fechaNacimiento: fechaNacimiento,

            rol: "Cliente",

            region: regionSeleccionada,

            comuna: comunaSeleccionada,

            direccion: direccion
        };


        // ==========================================
        // GUARDAR USUARIO
        // ==========================================

        usuarios.push(nuevoUsuario);

        localStorage.setItem(
            "usuariosAdmin",
            JSON.stringify(usuarios)
        );


        // ==========================================
        // REGISTRO EXITOSO
        // ==========================================

        alert(
            "Usuario registrado correctamente"
        );

        window.location.href =
            "../login/login.html";
    }
);


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - RUN
// ==========================================

const inputRun =
    document.getElementById("run");

const mensajeRun =
    document.getElementById("errorRun");

inputRun.addEventListener("input", function () {

    const runEscrito =
        inputRun.value.trim();

    mensajeRun.textContent = "";

    if (runEscrito === "") {

        mensajeRun.textContent =
            "El RUN es obligatorio";

    } else if (
        runEscrito.includes(".") ||
        runEscrito.includes("-")
    ) {

        mensajeRun.textContent =
            "El RUN debe ingresarse sin puntos ni guion";

    } else if (!validarRun(runEscrito)) {

        mensajeRun.textContent =
            "Ingrese un RUN chileno válido";
    }
});


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - NOMBRE
// ==========================================

const inputNombre =
    document.getElementById("nombre");

const mensajeNombre =
    document.getElementById("errorNombre");

inputNombre.addEventListener("input", function () {

    const valor =
        inputNombre.value.trim();

    mensajeNombre.textContent = "";

    if (valor === "") {

        mensajeNombre.textContent =
            "El nombre es obligatorio";

    } else if (valor.length > 50) {

        mensajeNombre.textContent =
            "El nombre no puede superar los 50 caracteres";
    }
});


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - APELLIDOS
// ==========================================

const inputApellidos =
    document.getElementById("apellidos");

const mensajeApellidos =
    document.getElementById("errorApellidos");

inputApellidos.addEventListener("input", function () {

    const valor =
        inputApellidos.value.trim();

    mensajeApellidos.textContent = "";

    if (valor === "") {

        mensajeApellidos.textContent =
            "Los apellidos son obligatorios";

    } else if (valor.length > 100) {

        mensajeApellidos.textContent =
            "Los apellidos no pueden superar los 100 caracteres";
    }
});


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - CORREO
// ==========================================

const inputCorreo =
    document.getElementById("correo");

const mensajeCorreo =
    document.getElementById("errorCorreo");

inputCorreo.addEventListener("input", function () {

    const valor =
        inputCorreo.value.trim();

    mensajeCorreo.textContent = "";

    if (valor === "") {

        mensajeCorreo.textContent =
            "El correo es obligatorio";

    } else if (valor.length > 100) {

        mensajeCorreo.textContent =
            "El correo no puede superar los 100 caracteres";

    } else if (!correoPermitido(valor)) {

        mensajeCorreo.textContent =
            "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
});


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - CONTRASEÑA
// ==========================================

const inputPassword =
    document.getElementById("password");

const mensajePassword =
    document.getElementById("errorPassword");

inputPassword.addEventListener("input", function () {

    const valor =
        inputPassword.value;

    mensajePassword.textContent = "";

    if (valor === "") {

        mensajePassword.textContent =
            "La contraseña es obligatoria";

    } else if (
        valor.length < 4 ||
        valor.length > 10
    ) {

        mensajePassword.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres";
    }
});


// ==========================================
// CONFIRMAR CONTRASEÑA EN TIEMPO REAL
// ==========================================

const inputConfirmarPassword =
    document.getElementById("confirmarPassword");

const mensajeConfirmarPassword =
    document.getElementById("errorConfirmarPassword");

inputConfirmarPassword.addEventListener(
    "input",
    function () {

        mensajeConfirmarPassword.textContent = "";

        if (inputConfirmarPassword.value === "") {

            mensajeConfirmarPassword.textContent =
                "Debe confirmar la contraseña";

        } else if (
            inputConfirmarPassword.value !==
            inputPassword.value
        ) {

            mensajeConfirmarPassword.textContent =
                "Las contraseñas no coinciden";
        }
    }
);


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - FECHA
// ==========================================

const inputFecha =
    document.getElementById("fechaNacimiento");

const mensajeFecha =
    document.getElementById("errorFecha");

inputFecha.addEventListener("change", function () {

    mensajeFecha.textContent = "";

    if (inputFecha.value === "") {

        mensajeFecha.textContent =
            "Ingrese su fecha de nacimiento";

        return;
    }

    const fechaNac =
        new Date(inputFecha.value + "T00:00:00");

    const hoy =
        new Date();

    let edad =
        hoy.getFullYear() -
        fechaNac.getFullYear();

    const mes =
        hoy.getMonth() -
        fechaNac.getMonth();

    if (
        mes < 0 ||
        (
            mes === 0 &&
            hoy.getDate() < fechaNac.getDate()
        )
    ) {

        edad--;
    }

    if (edad < 18) {

        mensajeFecha.textContent =
            "Debes ser mayor de 18 años para registrarte";
    }
});


// ==========================================
// VALIDACIÓN EN TIEMPO REAL - DIRECCIÓN
// ==========================================

const inputDireccion =
    document.getElementById("direccion");

const mensajeDireccion =
    document.getElementById("errorDireccion");

inputDireccion.addEventListener(
    "input",
    function () {

        const valor =
            inputDireccion.value.trim();

        mensajeDireccion.textContent = "";

        if (valor === "") {

            mensajeDireccion.textContent =
                "La dirección es obligatoria";

        } else if (valor.length > 300) {

            mensajeDireccion.textContent =
                "La dirección no puede superar los 300 caracteres";
        }
    }
);