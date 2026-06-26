import { PRODUCTS_URL, UPLOADS_URL } from "./config.js";
import { agregarAlCarrito } from "./carrito.js";

export let productos = [];

let paginaActual = 1;
const productosPorPagina = 4;

export async function cargarProductos() {
    const contenedorComponentes = document.getElementById("contenedorComponentes");
    const contenedorPerifericos = document.getElementById("contenedorPerifericos");

    if (!contenedorComponentes || !contenedorPerifericos) return;

    try {
        const respuesta = await fetch(PRODUCTS_URL);
        const resultado = await respuesta.json();

        productos = resultado.data || [];

        mostrarProductos();
        configurarPaginacion();
    } catch (error) {
        console.error(error);
        contenedorComponentes.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    }
}

function mostrarProductos() {
    const contenedorComponentes = document.getElementById("contenedorComponentes");
    const contenedorPerifericos = document.getElementById("contenedorPerifericos");

    if (!contenedorComponentes || !contenedorPerifericos) return;

    contenedorComponentes.innerHTML = "";
    contenedorPerifericos.innerHTML = "";

    const productosActivos = productos.filter(producto => producto.activo);

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosPagina = productosActivos.slice(inicio, fin);

    productosPagina.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        if (producto.categoria === "Componentes") {
            tarjeta.classList.add("tarjeta-componente");
        } else if (producto.categoria === "Periféricos") {
            tarjeta.classList.add("tarjeta-periferico");
        }

        tarjeta.innerHTML = `
            <img src="${UPLOADS_URL}/${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Categoría: ${producto.categoria}</p>
            <p class="precio">Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito
            </button>
        `;

        if (producto.categoria === "Componentes") {
            contenedorComponentes.appendChild(tarjeta);
        } else if (producto.categoria === "Periféricos") {
            contenedorPerifericos.appendChild(tarjeta);
        }
    });

    actualizarBotonesPaginacion();
}

function configurarPaginacion() {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    if (!btnAnterior || !btnSiguiente) return;

    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarProductos();
        }
    });

    btnSiguiente.addEventListener("click", () => {
        const totalPaginas = obtenerTotalPaginas();

        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarProductos();
        }
    });

    actualizarBotonesPaginacion();
}

function actualizarBotonesPaginacion() {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const numeroPagina = document.getElementById("numeroPagina");

    if (!btnAnterior || !btnSiguiente || !numeroPagina) return;

    const totalPaginas = obtenerTotalPaginas();

    numeroPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;

    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual === totalPaginas;
}

function obtenerTotalPaginas() {
    const productosActivos = productos.filter(producto => producto.activo);
    return Math.ceil(productosActivos.length / productosPorPagina);
}