let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarContadorCarrito();

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarToast(`${producto.title} añadido al carrito`);
}

function actualizarContadorCarrito() {
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    document.getElementById('contador-carrito').textContent = total;
}

function mostrarCarrito() {
    const contenedor = document.getElementById('carrito-contenido');
    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const fila = document.createElement('div');
        fila.classList.add('producto-carrito');
        fila.innerHTML = `
        <p>${producto.title}</p>
        <p>Cantidad: <input type="number" min="1" value="${producto.cantidad}" onchange="cambiarCantidad(${producto.id}, this.value)"></p>
        <p>Precio: $${producto.price}</p>
        <p>Total: $${(producto.price * producto.cantidad).toFixed(2)}</p>
        <button onclick="eliminarDelCarrito(${producto.id})">🗑️</button>
        `;
        contenedor.appendChild(fila);
    });

    mostrarTotal();
}

function mostrarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
    document.getElementById('total-carrito').textContent = `Total: $${total.toFixed(2)}`;
}

function cambiarCantidad(id, nuevaCantidad) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad = parseInt(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

function mostrarToast(mensaje) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProductos();
    actualizarContadorCarrito();
});

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agregá productos antes de finalizar.');
        return;
    }

    // Mostrar mensaje al usuario
    mostrarMensajeDeCompra();

    // Limpiar el carrito
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarContadorCarrito();
}

function mostrarMensajeDeCompra() {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-compra');
    mensaje.textContent = '🛍️ ¡Gracias por tu compra!';
    mensaje.style.background = '#d4edda';
    mensaje.style.color = '#155724';
    mensaje.style.padding = '10px';
    mensaje.style.margin = '15px';
    mensaje.style.borderRadius = '5px';
    mensaje.style.textAlign = 'center';

    const carritoSeccion = document.getElementById('carrito-contenido');
    carritoSeccion.innerHTML = '';
    carritoSeccion.appendChild(mensaje);

    // Elimina el mensaje después de unos segundos
    setTimeout(() => mensaje.remove(), 4000);
}