import { UPLOADS_URL } from "./config.js";
import { obtenerCarrito, guardarCarrito } from "./storage.js";
import { productos } from "./productos.js";

export function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(producto => producto.id === idProducto);

    if (!productoEncontrado) return;

    const carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: `${UPLOADS_URL}/${productoEncontrado.imagen}`,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert(`Agregaste al carrito: ${productoEncontrado.nombre}`);
}

export function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!contenedorCarrito || !totalCarrito) return;

    const carrito = obtenerCarrito();

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        totalCarrito.textContent = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.classList.add("tarjeta-producto");

        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Precio unitario: $${producto.precio}</p>

            <div class="cantidad-carrito">
                <button class="btn-restar">-</button>
                <span>${producto.cantidad}</span>
                <button class="btn-sumar">+</button>
            </div>

            <p class="precio">Subtotal: $${subtotal}</p>
            <button class="btn-eliminar">Eliminar</button>
        `;

        item.querySelector(".btn-sumar").addEventListener("click", () => sumarCantidad(producto.id));
        item.querySelector(".btn-restar").addEventListener("click", () => restarCantidad(producto.id));
        item.querySelector(".btn-eliminar").addEventListener("click", () => eliminarProducto(producto.id));

        contenedorCarrito.appendChild(item);
    });

    totalCarrito.textContent = `Total: $${total}`;
}

export function sumarCantidad(idProducto) {
    const carrito = obtenerCarrito();

    const producto = carrito.find(producto => producto.id === idProducto);

    if (producto) producto.cantidad++;

    guardarCarrito(carrito);
    mostrarCarrito();
}

export function restarCantidad(idProducto) {
    const carrito = obtenerCarrito();

    const producto = carrito.find(producto => producto.id === idProducto);

    if (producto && producto.cantidad > 1) producto.cantidad--;

    guardarCarrito(carrito);
    mostrarCarrito();
}

export function eliminarProducto(idProducto) {
    const carrito = obtenerCarrito().filter(producto => producto.id !== idProducto);

    guardarCarrito(carrito);
    mostrarCarrito();
}