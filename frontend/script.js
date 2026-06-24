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

const productos = [
    {
        id: 1,
        nombre: "Placa de video RTX 4060",
        categoria: "Componentes",
        precio: 450000,
        imagen: "img/Placa_de_Video_RTX_4060.jpg",
        activo: true
    },
    {
        id: 2,
        nombre: "Procesador Ryzen 5 5600",
        categoria: "Componentes",
        precio: 210000,
        imagen: "img/Procesador_Ryzen_5_5600.jpg",
        activo: true
    },
    {
        id: 3,
        nombre: "Memoria RAM 16GB DDR4",
        categoria: "Componentes",
        precio: 65000,
        imagen: "img/Memoria_Ram_16gb_ddr4.jpg",
        activo: true
    },
    {
        id: 4,
        nombre: "Teclado Redragon",
        categoria: "Periféricos",
        precio: 75000,
        imagen: "img/Teclado_Redragon.jpg",
        activo: true
    },  
    {
        id: 5,
        nombre: "Mouse Logitech",
        categoria: "Periféricos",
        precio: 35000,
        imagen: "img/Mouse_Logitech.jpg",
        activo: true
    },
    {
        id: 6,
        nombre: "Auriculares Hyperx",
        categoria: "Periféricos",
        precio: 55000,
        imagen: "img/Auriculares_Hyperx.jpg",
        activo: true
    }
];

function mostrarProductos() {
    const contenedorComponentes = document.getElementById("contenedorComponentes");
    const contenedorPerifericos = document.getElementById("contenedorPerifericos");

    if (!contenedorComponentes || !contenedorPerifericos) {
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Categoría: ${producto.categoria}</p>
            <p class="precio">Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;

        if (producto.categoria === "Componentes") {
            contenedorComponentes.appendChild(tarjeta);
        } else if (producto.categoria === "Periféricos") {
            contenedorPerifericos.appendChild(tarjeta);
        }
    });
}

mostrarProductos();

function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(producto => producto.id === idProducto);

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`Agregaste al carrito: ${productoEncontrado.nombre}`);
}


function mostrarCarrito() {
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!contenedorCarrito || !totalCarrito) {
        return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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

        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("tarjeta-producto");

        itemCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>Precio unitario: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p class="precio">Subtotal: $${subtotal}</p>
        `;

        contenedorCarrito.appendChild(itemCarrito);
    });

    totalCarrito.textContent = `Total: $${total}`;
}

mostrarCarrito();