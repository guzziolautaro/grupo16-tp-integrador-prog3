import { obtenerNombreUsuario } from "./storage.js";

export function guardarNombre() {
    const nombre = document.getElementById("nombreUsuario").value.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre.");
        return;
    }

    localStorage.setItem("nombreUsuario", nombre);
    window.location.href = "productos.html";
}

export function mostrarNombreUsuario() {
    const nombre = obtenerNombreUsuario();
    const nombreMostrado = document.getElementById("nombreMostrado");

    if (!nombreMostrado || !nombre) return;

    nombreMostrado.textContent = nombre
        .toLowerCase()
        .split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");
}

export function configurarLinksUsuario() {
    const usuarioLogueado = obtenerNombreUsuario();

    const linkTienda = document.getElementById("linkTienda");
    const linkCarrito = document.getElementById("linkCarrito");

    if (!usuarioLogueado) {
        if (linkTienda) linkTienda.style.display = "none";
        if (linkCarrito) linkCarrito.style.display = "none";
    }
}