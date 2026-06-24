function guardarNombre() {
    const nombre = document.getElementById("nombreUsuario").value.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre.");
        return;
    }

    localStorage.setItem("nombreUsuario", nombre);

    window.location.href = "productos.html";
}

const nombreGuardado = localStorage.getItem("nombreUsuario");
const nombreMostrado = document.getElementById("nombreMostrado");

if (nombreMostrado && nombreGuardado) {
    const nombreConMayusculas = nombreGuardado
        .toLowerCase()
        .split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");

    nombreMostrado.textContent = nombreConMayusculas;
}