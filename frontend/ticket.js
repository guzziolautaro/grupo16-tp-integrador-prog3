export function mostrarTicket() {
    const ticketCliente = document.getElementById("ticketCliente");
    const ticketEmpresa = document.getElementById("ticketEmpresa");
    const ticketProductos = document.getElementById("ticketProductos");
    const ticketTotal = document.getElementById("ticketTotal");

    if (!ticketCliente || !ticketProductos || !ticketTotal) return;

    const ultimaCompra = JSON.parse(localStorage.getItem("ultimaCompra"));

    if (!ultimaCompra) {
        ticketProductos.innerHTML = "<p>No hay ninguna compra para mostrar.</p>";
        ticketTotal.textContent = "Total: $0";
        return;
    }

    ticketCliente.textContent = ultimaCompra.nombreCliente || "Sin nombre";

    if (ticketEmpresa) {
        ticketEmpresa.textContent = ultimaCompra.nombreEmpresa || "HardwarePoint";
    }

    ticketProductos.innerHTML = "";

    ultimaCompra.productos.forEach(producto => {
        const precioUnitario = Number(producto.precioUnitario);
        const cantidad = Number(producto.cantidad);
        const subtotal = precioUnitario * cantidad;

        const itemTicket = document.createElement("div");
        itemTicket.classList.add("ticket-producto");

        itemTicket.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>Cantidad: ${cantidad}</p>
            <p>Precio unitario: $${precioUnitario}</p>
            <p>Subtotal: $${subtotal}</p>
        `;

        ticketProductos.appendChild(itemTicket);
    });

    ticketTotal.textContent = `Total: $${ultimaCompra.total}`;
    ticketTotal.classList.add("ticket-total");
}

export function imprimirTicket() {
    window.print();
}

export function reiniciarCompra() {
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("carrito");
    localStorage.removeItem("ultimaCompra");

    window.location.href = "index.html";
}