import { API_URL, UPLOADS_URL } from "./config.js";
import { agregarAlCarrito } from "./carrito.js";

async function cargarDetalleProducto() {
    const contenedorDetalle = document.getElementById("contenedorDetalle");

    if (!contenedorDetalle) return;

    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id");

    if (!idProducto) {
        contenedorDetalle.innerHTML = "<p>No se recibió el ID del producto.</p>";
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/api/products/${idProducto}`);
        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "No se pudo cargar el producto.");
        }

        const producto = resultado.data;

        contenedorDetalle.innerHTML = `
            <div class="tarjeta-detalle">
                <img src="${UPLOADS_URL}/${producto.imagen}" alt="${producto.nombre}">

                <div class="info-detalle">
                    <h3>${producto.nombre}</h3>
                    <p><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <p><strong>Estado:</strong> Disponible</p>

                    <button id="btnAgregarDetalle">Agregar al carrito</button>
                </div>
            </div>
        `;

        const btnAgregarDetalle = document.getElementById("btnAgregarDetalle");
        btnAgregarDetalle.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

    } catch (error) {
        console.error(error);
        contenedorDetalle.innerHTML = `<p>${error.message}</p>`;
    }
}

cargarDetalleProducto();