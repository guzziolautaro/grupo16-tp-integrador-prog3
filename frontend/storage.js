export function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function obtenerNombreUsuario() {
    return localStorage.getItem("nombreUsuario");
}