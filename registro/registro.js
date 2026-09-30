// REGIONES Y COMUNAS
 
 

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


// Obtener el select de región
const region = document.getElementById("region");


// Agregar las regiones al select
for (const nombreRegion in regionesComunas) {

    const opcion = document.createElement("option");

    opcion.value = nombreRegion;
    opcion.textContent = nombreRegion;

    region.appendChild(opcion);
}


 
// COMUNAS
 
const comuna = document.getElementById("comuna");


// Cuando cambia la región
region.addEventListener("change", function () {

    // Limpiar las comunas anteriores
    comuna.innerHTML =
        '<option value="">Seleccione una comuna</option>';

    const regionSeleccionada = region.value;


    // Si seleccionó una región
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


 
// FUNCIÓN PARA VALIDAR RUN
 

function validarRun(run) {

    // Debe tener entre 7 y 9 caracteres
    if (run.length < 7 || run.length > 9) {
        return false;
    }


    // Solo números y K como dígito verificador
    if (!/^[0-9]+[0-9kK]$/.test(run)) {
        return false;
    }


    // Separar cuerpo y dígito verificador
    const cuerpo = run.slice(0, -1);

    const dvIngresado =
        run.slice(-1).toUpperCase();


    let suma = 0;

    let multiplicador = 2;


    // Calcular dígito verificador
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


    // Comparar los dígitos
    return dvCalculado === dvIngresado;
}


 
// VALIDACIÓN DEL FORMULARIO
 

const formulario =
    document.getElementById("formRegistro");


// Cuando se presiona Registrarse
formulario.addEventListener(
    "submit",
    function (event) {

        // Evita que la página se recargue
        event.preventDefault();


        // Obtener los valores
        const run = document.getElementById("run").value.trim();
        const nombre =document.getElementById("nombre").value.trim();
        const apellidos =document.getElementById("apellidos").value.trim();
        const correo =document.getElementById("correo").value.trim();
        const fechaNacimiento =document.getElementById("fechaNacimiento").value;
        const direccion =document.getElementById("direccion").value.trim();
        const regionSeleccionada =document.getElementById("region").value;
        const comunaSeleccionada =document.getElementById("comuna").value;


        // Obtener mensajes de error
        const errorRun =document.getElementById("errorRun");
        const errorNombre =document.getElementById("errorNombre");
        const errorApellidos =document.getElementById("errorApellidos");
        const errorCorreo = document.getElementById("errorCorreo");
        const errorFecha = document.getElementById("errorFecha");
        const errorDireccion = document.getElementById("errorDireccion");


        // Limpiar mensajes anteriores
        errorRun.textContent = "";
        errorNombre.textContent = "";
        errorApellidos.textContent = "";
        errorCorreo.textContent = "";
        errorFecha.textContent = "";
        errorDireccion.textContent = "";


     
        // VALIDAR RUN
  

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


     
        // VALIDAR NOMBRE
     

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


   
        // VALIDAR APELLIDOS
    

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


    
        // VALIDAR CORREO
 

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


        // Dominios permitidos
        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];


        const dominioValido =
            dominiosPermitidos.some(
                function (dominio) {

                    return correo
                        .toLowerCase()
                        .endsWith(dominio);
                }
            );


        if (!dominioValido) {

            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";

            return;
        }


   
        // VALIDAR EDAD
   

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


        // Revisar si todavía no cumplió años
        if (
            mes < 0 ||
            (
                mes === 0 &&
                hoy.getDate() < fechaNac.getDate()
            )
        ) {

            edad--;
        }


        // Debe ser mayor de edad
        if (edad < 18) {

            errorFecha.textContent =
                "Debes ser mayor de 18 años para registrarte";

            return;
        }


 
        // VALIDAR REGIÓN
      

        if (regionSeleccionada === "") {

            alert(
                "Debe seleccionar una región"
            );

            return;
        }


   
        // VALIDAR COMUNA
 

        if (comunaSeleccionada === "") {

            alert(
                "Debe seleccionar una comuna"
            );

            return;
        }


    
        // VALIDAR DIRECCIÓN
    

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


        // Si todo está correcto
        alert(
            "Usuario registrado correctamente"
        );

    }
);

 
// VALIDACIÓN EN TIEMPO REAL - NOMBRE
 

const inputNombre =
    document.getElementById("nombre");

const mensajeNombre =
    document.getElementById("errorNombre");


inputNombre.addEventListener(
    "input",
    function () {

        const nombreEscrito =
            inputNombre.value.trim();


        // Limpiar mensaje
        mensajeNombre.textContent = "";


        // Campo vacío
        if (nombreEscrito === "") {

            mensajeNombre.textContent =
                "El nombre es obligatorio";
        }


        // Más de 50 caracteres
        else if (nombreEscrito.length > 50) {

            mensajeNombre.textContent =
                "El nombre no puede superar los 50 caracteres";
        }

    }
);


 
// VALIDACIÓN EN TIEMPO REAL - APELLIDOS
 

const inputApellidos =
    document.getElementById("apellidos");

const mensajeApellidos =
    document.getElementById("errorApellidos");


inputApellidos.addEventListener(
    "input",
    function () {

        const apellidosEscritos =
            inputApellidos.value.trim();


        // Limpiar mensaje
        mensajeApellidos.textContent = "";


        // Campo vacío
        if (apellidosEscritos === "") {

            mensajeApellidos.textContent =
                "Los apellidos son obligatorios";
        }


        // Más de 100 caracteres
        else if (apellidosEscritos.length > 100) {

            mensajeApellidos.textContent =
                "Los apellidos no pueden superar los 100 caracteres";
        }

        

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

    // Limpia el mensaje anterior
    mensajeRun.textContent = "";

    // RUN obligatorio
    if (runEscrito === "") {

        mensajeRun.textContent =
            "El RUN es obligatorio";
    }

    // No permite puntos ni guion
    else if (
        runEscrito.includes(".") ||
        runEscrito.includes("-")
    ) {

        mensajeRun.textContent =
            "El RUN debe ingresarse sin puntos ni guion";
    }

    // Valida el RUN chileno
    else if (!validarRun(runEscrito)) {

        mensajeRun.textContent =
            "Ingrese un RUN chileno válido";
    }

});
 
// VALIDACIÓN EN TIEMPO REAL - CORREO
 

const inputCorreo =document.getElementById("correo");
const mensajeCorreo = document.getElementById("errorCorreo");


inputCorreo.addEventListener("input", function () {

    const correoEscrito =inputCorreo.value.trim();

    // Limpia el mensaje anterior
    mensajeCorreo.textContent = "";

    // Correo obligatorio
    if (correoEscrito === "") {

        mensajeCorreo.textContent =
            "El correo es obligatorio";
    }

    // Máximo 100 caracteres
    else if (correoEscrito.length > 100) {

        mensajeCorreo.textContent =
            "El correo no puede superar los 100 caracteres";
    }

    else {

        // Dominios permitidos
        const dominiosPermitidos = [
            "@duoc.cl",
            "@profesor.duoc.cl",
            "@gmail.com"
        ];


        const dominioValido =dominiosPermitidos.some(function (dominio) {

                return correoEscrito
                    .toLowerCase()
                    .endsWith(dominio);

            });


        // Verifica el dominio
        if (!dominioValido) {

            mensajeCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
        }
    }

});

// ==========================================
// VALIDACIÓN EN TIEMPO REAL - FECHA NACIMIENTO
// ==========================================

const inputFecha =
    document.getElementById("fechaNacimiento");

const mensajeFecha =
    document.getElementById("errorFecha");


inputFecha.addEventListener("change", function () {

    const fechaEscrita = inputFecha.value;

    // Limpia el mensaje anterior
    mensajeFecha.textContent = "";

    if (fechaEscrita === "") {
        mensajeFecha.textContent =
            "Ingrese su fecha de nacimiento";

        return;
    }


    const fechaNac =new Date(fechaEscrita + "T00:00:00");
    const hoy =new Date();
    let edad =hoy.getFullYear() - fechaNac.getFullYear();
    const mes =hoy.getMonth() - fechaNac.getMonth();


    // Revisar si todavía no cumplió años
    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < fechaNac.getDate())
    ) {
        edad--;
    }


    // Validar mayoría de edad
    if (edad < 18) {

        mensajeFecha.textContent =
            "Debes ser mayor de 18 años para registrarte";
    }

});
 
// VALIDACIÓN EN TIEMPO REAL - DIRECCIÓN
 

const inputDireccion =document.getElementById("direccion");
const mensajeDireccion =document.getElementById("errorDireccion");

inputDireccion.addEventListener("input", function () {

    const direccionEscrita = inputDireccion.value.trim();

    // Limpia el mensaje anterior
    mensajeDireccion.textContent = "";

    // Dirección obligatoria
    if (direccionEscrita === "") {

        mensajeDireccion.textContent =
            "La dirección es obligatoria";
    }

    // Máximo 300 caracteres
    else if (direccionEscrita.length > 300) {

        mensajeDireccion.textContent =
            "La dirección no puede superar los 300 caracteres";
    }

});