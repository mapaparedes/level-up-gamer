// ============================================================
// CATÁLOGO DE PRODUCTOS
// Para agregar o cambiar productos, edita solo este arreglo.
// - imagen: ruta de una foto (ej: "../img/teclado.png").
//           Si la dejas vacía se muestra el icono.
// ============================================================
const productos = [
    {
        nombre: "Consola PlayStation 5 1TB",
        categoria: "Consolas",
        descripcion: "Consola de última generación con juegos en 4K.",
        precio: 549990,
        icono: "🎮",
        imagen: "../img/ps5.jpeg"
    },
    {
        nombre: "Control Inalámbrico Pro",
        categoria: "Accesorios",
        descripcion: "Control ergonómico con vibración y batería de larga duración.",
        precio: 64990,
        icono: "🕹️",
        imagen: "../img/control.jpeg"
    },
    {
        nombre: "Teclado Mecánico RGB",
        categoria: "Accesorios",
        descripcion: "Switches mecánicos e iluminación RGB personalizable.",
        precio: 59990,
        icono: "⌨️",
        imagen: "../img/teclado.jpg"
    },
    {
        nombre: "Mouse Gamer 16000 DPI",
        categoria: "Accesorios",
        descripcion: "Sensor de alta precisión y 7 botones programables.",
        precio: 29990,
        icono: "🖱️",
        imagen: "../img/mouse.jpeg"
    },
    {
        nombre: "Audífonos Gamer 7.1",
        categoria: "Accesorios",
        descripcion: "Sonido envolvente con micrófono con cancelación de ruido.",
        precio: 49990,
        icono: "🎧",
        imagen: "../img/audifonos.jpeg"
    },
    {
        nombre: "Monitor Gamer 27\" 144Hz",
        categoria: "Computadores",
        descripcion: "Pantalla QHD con 1 ms de respuesta y 144Hz.",
        precio: 219990,
        icono: "🖥️",
        imagen: "../img/monitor.jpeg"
    },
    {
        nombre: "PC Gamer Ryzen 7 + RTX",
        categoria: "Computadores",
        descripcion: "Computador armado listo para jugar en alto rendimiento.",
        precio: 1299990,
        icono: "💻",
        imagen: "../img/pc-gamer.jpg"
    },
    {
        nombre: "Silla Gamer Ergonómica",
        categoria: "Sillas Gamer",
        descripcion: "Respaldo reclinable, soporte lumbar y apoyabrazos 4D.",
        precio: 189990,
        icono: "💺",
        imagen: "../img/silla.jpeg"
    },
    {
        nombre: "Mousepad XL Gamer",
        categoria: "Accesorios",
        descripcion: "Superficie extendida con base antideslizante y bordes cosidos.",
        precio: 14990,
        icono: "🟩",
        imagen: "../img/mousepad.jpeg"
    }
];

// ============================================================
// Elementos del HTML
// ============================================================
const listaProductos = document.getElementById("lista-productos");
const contenedorFiltros = document.getElementById("filtros");
const contador = document.getElementById("contador-carrito");
const aviso = document.getElementById("aviso");

let categoriaActual = "Todos";
let temporizadorAviso;

// ============================================================
// Carrito (usa el mismo formato de carrito.js)
// ============================================================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function actualizarContador() {
    const total = obtenerCarrito().reduce(
        (suma, item) => suma + (item.cantidad || 1), 0
    );
    contador.textContent = total;
}

function agregarAlCarrito(indice) {
    const producto = productos[indice];
    const carrito = obtenerCarrito();

    const existente = carrito.find(item => item.nombre === producto.nombre);

    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
    mostrarAviso(producto.nombre + " agregado al carrito");
}

function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");

    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => {
        aviso.classList.remove("visible");
    }, 2000);
}

// ============================================================
// Mostrar filtros y productos
// ============================================================
function mostrarFiltros() {
    const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];

    contenedorFiltros.innerHTML = "";

    categorias.forEach(categoria => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = categoria;

        if (categoria === categoriaActual) {
            boton.classList.add("activo");
        }

        boton.addEventListener("click", () => {
            categoriaActual = categoria;
            mostrarFiltros();
            mostrarProductos();
        });

        contenedorFiltros.appendChild(boton);
    });
}

function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach((producto, indice) => {

        if (categoriaActual !== "Todos" && producto.categoria !== categoriaActual) {
            return;
        }

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-card");

        const imagen = producto.imagen
            ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
            : producto.icono;

        tarjeta.innerHTML = `
            <div class="producto-imagen">${imagen}</div>

            <div class="producto-contenido">
                <span class="categoria">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">$${producto.precio.toLocaleString("es-CL")}</div>

                <button class="btn-agregar" type="button">
                    Agregar al carrito
                </button>
            </div>
        `;

        tarjeta.querySelector(".btn-agregar").addEventListener(
            "click", () => agregarAlCarrito(indice)
        );

        listaProductos.appendChild(tarjeta);
    });
}

// Al cargar la página
mostrarFiltros();
mostrarProductos();
actualizarContador();
