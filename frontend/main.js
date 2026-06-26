import { guardarNombre, mostrarNombreUsuario, configurarLinksUsuario } from "./usuario.js";
import { cargarProductos } from "./productos.js";
import { agregarAlCarrito, mostrarCarrito } from "./carrito.js";
import { finalizarCompra, confirmarCompra, cerrarModal, cerrarModalCarritoVacio } from "./compra.js";
import { mostrarTicket, imprimirTicket, reiniciarCompra } from "./ticket.js";

mostrarNombreUsuario();
configurarLinksUsuario();
cargarProductos();
mostrarCarrito();
mostrarTicket();

window.agregarAlCarrito = agregarAlCarrito;
window.guardarNombre = guardarNombre;
window.finalizarCompra = finalizarCompra;
window.confirmarCompra = confirmarCompra;
window.cerrarModal = cerrarModal;
window.cerrarModalCarritoVacio = cerrarModalCarritoVacio;
window.imprimirTicket = imprimirTicket;
window.reiniciarCompra = reiniciarCompra;