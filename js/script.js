// Punto de entrada
document.addEventListener('DOMContentLoaded', init);

let carrito = [];

function init() {
  cargarCarrito();
  fetchProductos();
  actualizarBadge();
}

// Obtiene productos de la API REST y maneja la estructura de respuesta
async function fetchProductos() {
  try {
    const res = await fetch('https://drinks-api-web.vercel.app/api/v1/drinks?limit=20');
    const json = await res.json();
    // Manejo de distintos esquemas de respuesta
    const productos = json.data || json.drinks || (Array.isArray(json) ? json : []);
    renderProductos(productos);
  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
}

// Inyecta tarjetas en el DOM según categoría
function renderProductos(productos) {
  const sin = document.getElementById('productos-sin-alcohol');
  const con = document.getElementById('productos-con-alcohol');

  if (!sin || !con) {
    console.error('Contenedores de productos no encontrados: revisa los IDs en el HTML.');
    return;
  }

  productos.forEach(p => {
    const card = document.createElement('figure');
    card.className = 'card producto';
    card.innerHTML = `
      <img src="${p.imageUrl || p.imagen}" alt="${p.name || p.nombre}" loading="lazy">
      <figcaption>
        <p class="producto-nombre">${p.name || p.nombre}</p>
        <p class="producto-precio">$${p.price || p.precio}</p>
        <button type="button" data-id="${p.id}">Añadir al carrito</button>
      </figcaption>
    `;
    card.querySelector('button').addEventListener('click', () => agregarAlCarrito(p.id));

    // Clasificación por categoría (ajusta según la API)
    const categoria = (p.category || p.categoria || '').toLowerCase();
    if (categoria.includes('sin') || categoria.includes('non')) sin.appendChild(card);
    else con.appendChild(card);
  });
}

// Lee carrito de localStorage
function cargarCarrito() {
  const stored = localStorage.getItem('carrito');
  carrito = stored ? JSON.parse(stored) : [];
}

// Guarda carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Añade producto o incrementa cantidad
function agregarAlCarrito(id) {
  const item = carrito.find(i => i.id === id);
  if (item) item.cantidad++;
  else carrito.push({ id, cantidad: 1 });
  guardarCarrito();
  actualizarBadge();
}

// Actualiza indicador de carrito en el enlace
function actualizarBadge() {
  const total = carrito.reduce((sum, i) => sum + i.cantidad, 0);
  const enlace = document.querySelector('a[title="Ver carrito"]');
  if (enlace) enlace.setAttribute('data-count', total);
}
