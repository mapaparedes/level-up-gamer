// ===============================
// PROTEGER PÁGINA DE USUARIOS
// ===============================

function verificarSesionAdmin() {

    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    if (!usuarioActivo || usuarioActivo.rol !== "Administrador") {

        window.location.replace("../login/login.html");
        return false;
    }

    return true;
}

verificarSesionAdmin();

window.addEventListener("pageshow", function () {
    verificarSesionAdmin();
});


// ===============================
// USUARIOS INICIALES
// ===============================

const usuariosIniciales = [

    {
        run: "19011022K",
        nombre: "Administrador",
        apellidos: "Level-Up",
        correo: "admin@gmail.com",
        password: "admin123",
        fechaNacimiento: "",
        rol: "Administrador",
        region: "Metropolitana",
        comuna: "Santiago",
        direccion: "Level-Up Gamer"
    },

    {
        run: "19011023K",
        nombre: "Vendedor",
        apellidos: "Level-Up",
        correo: "vendedor@gmail.com",
        password: "venta123",
        fechaNacimiento: "",
        rol: "Vendedor",
        region: "Metropolitana",
        comuna: "Santiago",
        direccion: "Level-Up Gamer"
    },

    {
        run: "19011024K",
        nombre: "Cliente",
        apellidos: "Demo",
        correo: "cliente@gmail.com",
        password: "cliente1",
        fechaNacimiento: "",
        rol: "Cliente",
        region: "Metropolitana",
        comuna: "Santiago",
        direccion: "Level-Up Gamer"
    }

];


// ===============================
// RECUPERAR USUARIOS
// ===============================

let usuarios = JSON.parse(
    localStorage.getItem("usuariosAdmin")
);

if (!usuarios) {

    usuarios = usuariosIniciales;

    guardarUsuarios();
}


// Compatibilidad con usuarios antiguos
usuarios.forEach(function (usuario) {

    if (usuario.run === undefined) {
        usuario.run = "";
    }

    if (usuario.apellidos === undefined) {
        usuario.apellidos = "";
    }

    if (usuario.fechaNacimiento === undefined) {
        usuario.fechaNacimiento = "";
    }

    if (usuario.region === undefined) {
        usuario.region = "";
    }

    if (usuario.comuna === undefined) {
        usuario.comuna = "";
    }

    if (usuario.direccion === undefined) {
        usuario.direccion = "";
    }
});

guardarUsuarios();


// ===============================
// ELEMENTOS HTML
// ===============================

const formulario =
    document.getElementById("form-usuario");

const run =
    document.getElementById("run");

const nombre =
    document.getElementById("nombre");

const apellidos =
    document.getElementById("apellidos");

const correo =
    document.getElementById("correo");

const password =
    document.getElementById("password");

const fechaNacimiento =
    document.getElementById("fecha-nacimiento");

const rol =
    document.getElementById("rol");

const region =
    document.getElementById("region");

const comuna =
    document.getElementById("comuna");

const direccion =
    document.getElementById("direccion");

const indiceUsuario =
    document.getElementById("indice-usuario");

const tablaUsuarios =
    document.getElementById("tabla-usuarios");

const tituloFormulario =
    document.getElementById("titulo-formulario");

const btnGuardar =
    document.getElementById("btn-guardar");

const btnCancelar =
    document.getElementById("btn-cancelar");


// ===============================
// REGIONES Y COMUNAS
// ===============================

const regionesComunas = {

    Metropolitana: [
        "Santiago",
        "Puente Alto",
        "Maipú",
        "La Florida",
        "Las Condes"
    ],

    Valparaiso: [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    Biobio: [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "Coronel"
    ]
};


// ===============================
// CAMBIAR COMUNAS
// ===============================

function cargarComunas(comunaSeleccionada = "") {

    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada =
        region.value;

    if (!regionSeleccionada) {
        return;
    }

    regionesComunas[regionSeleccionada].forEach(
        function (nombreComuna) {

            const opcion =
                document.createElement("option");

            opcion.value =
                nombreComuna;

            opcion.textContent =
                nombreComuna;

            if (nombreComuna === comunaSeleccionada) {
                opcion.selected = true;
            }

            comuna.appendChild(opcion);
        }
    );
}


region.addEventListener("change", function () {
    cargarComunas();
});


// ===============================
// GUARDAR USUARIOS
// ===============================

function guardarUsuarios() {

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(usuarios)
    );
}


// ===============================
// VALIDAR RUN CHILENO
// ===============================

function validarRun(runIngresado) {

    let rut = runIngresado
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/-/g, "");


    if (!/^[0-9]{6,8}[0-9K]$/.test(rut)) {
        return false;
    }


    const cuerpo =
        rut.slice(0, -1);

    const dv =
        rut.slice(-1);


    let suma = 0;
    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma +=
            Number(cuerpo[i]) *
            multiplicador;

        multiplicador++;

        if (multiplicador === 8) {
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

        dvCalculado =
            String(resto);
    }


    return dv === dvCalculado;
}


// ===============================
// MOSTRAR USUARIOS
// ===============================

function mostrarUsuarios() {

    tablaUsuarios.innerHTML = "";


    usuarios.forEach(function (usuario, indice) {

        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                ${usuario.run || "-"}
            </td>

            <td>
                ${usuario.nombre}
            </td>

            <td>
                ${usuario.apellidos || "-"}
            </td>

            <td>
                ${usuario.correo}
            </td>

            <td>
                ${usuario.rol}
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarUsuario(${indice})"
                >
                    Editar
                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarUsuario(${indice})"
                >
                    Eliminar
                </button>

            </td>
        `;


        tablaUsuarios.appendChild(fila);
    });
}


// ===============================
// LIMPIAR ERRORES
// ===============================

function limpiarErrores() {

    document.getElementById("error-run").textContent = "";

    document.getElementById("error-nombre").textContent = "";

    document.getElementById("error-apellidos").textContent = "";

    document.getElementById("error-correo").textContent = "";

    document.getElementById("error-password").textContent = "";

    document.getElementById(
        "error-fecha-nacimiento"
    ).textContent = "";

    document.getElementById("error-rol").textContent = "";

    document.getElementById("error-region").textContent = "";

    document.getElementById("error-comuna").textContent = "";

    document.getElementById("error-direccion").textContent = "";
}


// ===============================
// VALIDAR FORMULARIO
// ===============================

function validarFormulario() {

    limpiarErrores();

    let valido = true;


    // RUN
    const runIngresado =
        run.value.trim().toUpperCase();


    if (runIngresado === "") {

        document.getElementById("error-run").textContent =
            "El RUN es obligatorio.";

        valido = false;

    } else if (
        runIngresado.includes(".") ||
        runIngresado.includes("-")
    ) {

        document.getElementById("error-run").textContent =
            "Ingrese el RUN sin puntos ni guion.";

        valido = false;

    } else if (
        runIngresado.length < 7 ||
        runIngresado.length > 9
    ) {

        document.getElementById("error-run").textContent =
            "El RUN debe tener entre 7 y 9 caracteres.";

        valido = false;

    } else if (!validarRun(runIngresado)) {

        document.getElementById("error-run").textContent =
            "El RUN ingresado no es válido.";

        valido = false;
    }


    // NOMBRE
    if (nombre.value.trim() === "") {

        document.getElementById("error-nombre").textContent =
            "El nombre es obligatorio.";

        valido = false;

    } else if (nombre.value.trim().length > 50) {

        document.getElementById("error-nombre").textContent =
            "El nombre no puede superar los 50 caracteres.";

        valido = false;
    }


    // APELLIDOS
    if (apellidos.value.trim() === "") {

        document.getElementById("error-apellidos").textContent =
            "Los apellidos son obligatorios.";

        valido = false;

    } else if (apellidos.value.trim().length > 100) {

        document.getElementById("error-apellidos").textContent =
            "Los apellidos no pueden superar los 100 caracteres.";

        valido = false;
    }


    // CORREO
    const correoIngresado =
        correo.value.trim().toLowerCase();


    if (correoIngresado === "") {

        document.getElementById("error-correo").textContent =
            "El correo es obligatorio.";

        valido = false;

    } else {

        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];


        const dominioValido =
            dominiosPermitidos.some(
                function (dominio) {

                    return correoIngresado.endsWith(
                        dominio
                    );
                }
            );


        if (!dominioValido) {

            document.getElementById("error-correo").textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

            valido = false;
        }
    }


    // CONTRASEÑA
    if (
        password.value.length < 4 ||
        password.value.length > 10
    ) {

        document.getElementById("error-password").textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        valido = false;
    }


    // ROL
    if (rol.value === "") {

        document.getElementById("error-rol").textContent =
            "Seleccione un tipo de usuario.";

        valido = false;
    }


    // DIRECCIÓN
    if (direccion.value.trim() === "") {

        document.getElementById("error-direccion").textContent =
            "La dirección es obligatoria.";

        valido = false;

    } else if (direccion.value.trim().length > 300) {

        document.getElementById("error-direccion").textContent =
            "La dirección no puede superar los 300 caracteres.";

        valido = false;
    }


    return valido;
}


// ===============================
// CREAR O EDITAR USUARIO
// ===============================

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validarFormulario()) {
            return;
        }


        // Verificar correo repetido
        const correoRepetido =
            usuarios.some(
                function (usuario, indice) {

                    return (
                        usuario.correo.toLowerCase() ===
                        correo.value.trim().toLowerCase()
                        &&
                        indice !== Number(indiceUsuario.value)
                    );
                }
            );


        if (correoRepetido) {

            document.getElementById("error-correo").textContent =
                "Este correo ya está registrado.";

            return;
        }


        // Verificar RUN repetido
        const runRepetido =
            usuarios.some(
                function (usuario, indice) {

                    return (
                        usuario.run &&
                        usuario.run.toUpperCase() ===
                        run.value.trim().toUpperCase()
                        &&
                        indice !== Number(indiceUsuario.value)
                    );
                }
            );


        if (runRepetido) {

            document.getElementById("error-run").textContent =
                "Este RUN ya está registrado.";

            return;
        }


        const usuario = {

            run:
                run.value.trim().toUpperCase(),

            nombre:
                nombre.value.trim(),

            apellidos:
                apellidos.value.trim(),

            correo:
                correo.value.trim().toLowerCase(),

            password:
                password.value,

            fechaNacimiento:
                fechaNacimiento.value,

            rol:
                rol.value,

            region:
                region.value,

            comuna:
                comuna.value,

            direccion:
                direccion.value.trim()
        };


        // EDITAR
        if (indiceUsuario.value !== "") {

            const indice =
                Number(indiceUsuario.value);

            usuarios[indice] =
                usuario;

            alert(
                "Usuario actualizado correctamente."
            );

        }

        // CREAR
        else {

            usuarios.push(usuario);

            alert(
                "Usuario agregado correctamente."
            );
        }


        guardarUsuarios();

        mostrarUsuarios();

        limpiarFormulario();
    }
);


// ===============================
// EDITAR USUARIO
// ===============================

function editarUsuario(indice) {

    const usuario =
        usuarios[indice];


    run.value =
        usuario.run || "";

    nombre.value =
        usuario.nombre || "";

    apellidos.value =
        usuario.apellidos || "";

    correo.value =
        usuario.correo || "";

    password.value =
        usuario.password || "";

    fechaNacimiento.value =
        usuario.fechaNacimiento || "";

    rol.value =
        usuario.rol || "";

    region.value =
        usuario.region || "";

    cargarComunas(
        usuario.comuna || ""
    );

    direccion.value =
        usuario.direccion || "";

    indiceUsuario.value =
        indice;


    tituloFormulario.textContent =
        "Editar usuario";

    btnGuardar.textContent =
        "Guardar cambios";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// ELIMINAR USUARIO
// ===============================

function eliminarUsuario(indice) {

    const confirmar =
        confirm(
            "¿Deseas eliminar al usuario " +
            usuarios[indice].nombre +
            "?"
        );


    if (!confirmar) {
        return;
    }


    usuarios.splice(indice, 1);

    guardarUsuarios();

    mostrarUsuarios();
}


// ===============================
// LIMPIAR FORMULARIO
// ===============================

function limpiarFormulario() {

    formulario.reset();

    indiceUsuario.value = "";

    comuna.innerHTML =
        '<option value="">Seleccione primero una región</option>';

    tituloFormulario.textContent =
        "Nuevo usuario";

    btnGuardar.textContent =
        "Guardar usuario";

    limpiarErrores();
}


// ===============================
// CANCELAR EDICIÓN
// ===============================

btnCancelar.addEventListener(
    "click",
    function () {

        limpiarFormulario();
    }
);


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

            localStorage.removeItem(
                "usuarioActivo"
            );

            window.location.replace(
                "../login/login.html"
            );
        }
    );
}


// ===============================
// MOSTRAR USUARIOS
// ===============================

mostrarUsuarios();