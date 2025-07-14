const urlAPI = "http://localhost:3000/api/bebidas";

async function cargarBebidas() {
    try {
        const res = await fetch(urlAPI);
        const data = await res.json();

        const contenedorSinAlcohol = document.getElementById("productos-sin-alcohol");
        const contenedorConAlcohol = document.getElementById("productos-con-alcohol");

        contenedorSinAlcohol.innerHTML = "";
        contenedorConAlcohol.innerHTML = "";

        // Sin alcohol
        data.sinAlcohol.forEach(bebida => {
        const card = document.createElement("div");
        card.classList.add("card-producto");
        card.innerHTML = `
            <img src="${bebida.imagen}" alt="${bebida.nombre}">
            <h3>${bebida.nombre}</h3>
            <p>Precio: $${bebida.precio}</p>
            <button>Añadir al carrito</button>
        `;
        contenedorSinAlcohol.appendChild(card);
        });

        // Con alcohol
        data.conAlcohol.forEach(bebida => {
        const card = document.createElement("div");
        card.classList.add("card-producto");
        card.innerHTML = `
            <img src="${bebida.imagen}" alt="${bebida.nombre}">
            <h3>${bebida.nombre}</h3>
            <p>Precio: $${bebida.precio}</p>
            <button>Añadir al carrito</button>
        `;
        contenedorConAlcohol.appendChild(card);
        });

    } catch (error) {
        console.error("Error al cargar bebidas:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarBebidas);

