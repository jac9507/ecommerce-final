const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir imágenes estáticas
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));


// Datos simulados
const bebidasSinAlcohol = [
    { id: 1, nombre: "Baggio Fresh Manzana 1.5Lt", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/SinAlcohol/BaggioFreshManzana15Lt.webp" },
    { id: 2, nombre: "Baggio Naranja 1Lt", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/SinAlcohol/BaggioNaranja1Lt.webp" },
    { id: 3, nombre: "Coca-cola Sabor Original 2.25Lt", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/SinAlcohol/Coca-colaSaborOriginal225Lt.webp" },
    { id: 4, nombre: "Coca-Cola Zero 2.25Lt", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/SinAlcohol/Coca-ColaZero225Lt.webp" },
    { id: 5, nombre: "Cunnington Pomelo 2.25Lt", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/SinAlcohol/CunningtonPomelo225Lt.webp" },
    { id: 6, nombre: "Fanta Naranja 1.75Lt", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/SinAlcohol/FantaNaranja175Lt.webp" },
    { id: 7, nombre: "Manaos Pomelo 2.25Lt", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/SinAlcohol/ManaosPomelo225Lt.webp" },
    { id: 8, nombre: "Pepsi Cola 1.5Lt", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/SinAlcohol/PepsiCola15Lt.webp" },
    { id: 9, nombre: "Sierra De Los Padres Agua 600cc", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/SinAlcohol/SierraDeLosPadresAgua600cc.webp" },
    { id: 10, nombre: "Sprite Lima Limón 3Lt", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/SinAlcohol/SpriteLimaLimón3Lt.webp" },
];


const bebidasConAlcohol = [
    { id: 1, nombre: "Cerveza Artesanal Goyeneche Porter 500ml", categoria: "con-alcohol", precio: 1200, imagen: "http://localhost:3000/imagenes/ConAlcohol/CervezaArtesanalGoyenechePorter500ml.webp" },
    { id: 2, nombre: "DrLemon Mojito Lata 473cc", categoria: "con-alcohol", precio: 2500, imagen: "http://localhost:3000/imagenes/ConAlcohol/DrLemonMojitoLata473cc.webp" },
    { id: 3, nombre: "Fernet Branca 750cc", categoria: "con-alcohol", precio: 1200, imagen: "http://localhost:3000/imagenes/ConAlcohol/FernetBranca750cc.webp" },
    { id: 4, nombre: "Gancia Americano 950ml", categoria: "con-alcohol", precio: 2500, imagen: "http://localhost:3000/imagenes/ConAlcohol/GanciaAmericano950ml.webp" },
    { id: 5, nombre: "Gin Gordon's LondonDry 700ml", categoria: "con-alcohol", precio: 1200, imagen: "http://localhost:3000/imagenes/ConAlcohol/GinGordon'sLondonDry700ml.webp" },
    { id: 6, nombre: "Jagermeister 1750cc", categoria: "con-alcohol", precio: 2500, imagen: "http://localhost:3000/imagenes/ConAlcohol/Jagermeister1750cc.webp" },
    { id: 7, nombre: "Johnnie Walker Blue Label whisky Scotch 750mL", categoria: "con-alcohol", precio: 1200, imagen: "http://localhost:3000/imagenes/ConAlcohol/JohnnieWalkerBlueLabelwhiskyScotch750mL.webp" },
    { id: 8, nombre: "Martini Bianco Vermut 1Lt", categoria: "con-alcohol", precio: 2500, imagen: "http://localhost:3000/imagenes/ConAlcohol/MartiniBiancoVermut1Lt.webp" },
    { id: 9, nombre: "Tres Plumas Licor De Cafe Al Coñac 750Cc", categoria: "sin-alcohol", precio: 500, imagen: "http://localhost:3000/imagenes/ConAlcohol/TresPlumasLicorDeCafeAlCoñac750Cc.webp" },
    { id: 10, nombre: "Vino Rutini Colección Cabernet Malbec 750ml", categoria: "sin-alcohol", precio: 800, imagen: "http://localhost:3000/imagenes/ConAlcohol/VinoRutiniColecciónCabernetMalbec750ml.webp" },
];

// Endpoint que devuelve ambos arreglos
app.get('/api/bebidas', (req, res) => {
    res.json({
        sinAlcohol: bebidasSinAlcohol,
        conAlcohol: bebidasConAlcohol
    });
});

app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
});
