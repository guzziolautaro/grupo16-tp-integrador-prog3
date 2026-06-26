import { obtenerCarrito } from "./storage.js";

export function finalizarCompra() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        abrirModal("modalCarritoVacio");
        return;
    }

    abrirModal("modalConfirmacion");
}

export async function confirmarCompra() {
    const carrito = obtenerCarrito();
    const nombreCliente = localStorage.getItem("nombreUsuario");

    if (!nombreCliente) {
        alert("No se encontró el nombre del cliente.");
        return;
    }

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const items = carrito.map(producto => ({
        id: producto.id,
        cantidad: producto.cantidad
    }));

    try {
        const respuesta = await fetch("http://localhost:3000/api/compra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombreCliente,
                items
            })
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "Error al confirmar la compra.");
        }

        localStorage.setItem("ultimaCompra", JSON.stringify(resultado.ticket));
        localStorage.removeItem("carrito");

        window.location.href = "ticket.html";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

export function cerrarModal() {
    cerrarModalPorId("modalConfirmacion");
}

export function cerrarModalCarritoVacio() {
    cerrarModalPorId("modalCarritoVacio");
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
}

function cerrarModalPorId(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}