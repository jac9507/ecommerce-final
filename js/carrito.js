let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cuerpoTabla = document.getElementById("carrito-body");
const totalElemento = document.getElementById("total-precio");
const btnVaciar = document.getElementById("vaciar-carrito");
const btnComprar = document.getElementById("comprar");

// Simulación de productos (en real sería desde API o localStorage compartido)
const productosDisponibles = [
    { id: "1", nombre: "Cerveza IPA", precio: 1200 },
    { id: "2", nombre: "Agua con gas", precio: 500 },
    { id: "3", nombre: "Fernet", precio: 1500 }
];

// Render inicial
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
});

// Agregar producto
function agregarAlCarrito(id) {
    const producto = productosDisponibles.find(p => p.id === id);
    if (!producto) return;

    const enCarrito = carrito.find(item => item.id === id);
    if (enCarrito) {
        enCarrito.cantidad++;
    } else {

        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    renderCarrito();
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
});

// Confirmar compra
btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    alert("¡Gracias por tu compra!");
    carrito = [];
    guardarCarrito();
    renderCarrito();
});

// Render de tabla
function renderCarrito() {
    cuerpoTabla.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>
            <button onclick="modificarCantidad('${producto.id}', -1)">➖</button>
            ${producto.cantidad}
            <button onclick="modificarCantidad('${producto.id}', 1)">➕</button>
        </td>
        <td>$${subtotal}</td>
        <td><button onclick="eliminarProducto('${producto.id}')">🗑️</button></td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    totalElemento.textContent = total;
}

// Cambiar cantidad
function modificarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    producto.cantidad += cambio;
    if (producto.cantidad <= 0) {
        eliminarProducto(id);
    }

    guardarCarrito();
    renderCarrito();
}

// Eliminar producto
function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}