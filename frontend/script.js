function guardarNombre() {
    const nombre = document.getElementById("nombreUsuario").value.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre.");
        return;
    }

    localStorage.setItem("nombreUsuario", nombre);

    console.log("Nombre guardado:", nombre);
}