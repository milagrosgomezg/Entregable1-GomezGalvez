const juegos = [
   
    {
        id: 1,
        nombre: "balancin",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 50000,
    },
   {
        id: 2,
        nombre: "torre de aprendizaje",
        material: "madera",
        color: "marron",
        montessori: true,
        precio: 50000
    },
    {
        id: 3,
        nombre: "tobogan",
        material: "madera",
        color: "celeste",
        montessori: false,
        precio: 40000
    },
    
    {
        id: 4,
        nombre: "sube y baja",
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 40000
    },
    
   {
        id: 5,
        nombre: "rampa",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 50000
    },
    
    {
        id: 6,
        nombre: "juguete de arrastre",
        material: "madera",
        color: "verde",
        montessori: false,
        precio: 40000
    },
    
   {
        id: 7,
        nombre: "pata pata",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 45000
    },
    
    {
        id: 8,
        nombre: "hamaca",
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 20000
    },
    
    {
        id: 9,
        nombre: "tablero sensorial",
        material: "madera",
        color: "rosa",
        montessori: true,
        precio: 30000
    },
    
   {
        id: 10,    
        nombre: "xilofon",
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 25000
    },
    
  {
        id: 11,
        nombre: "encastre",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 15000
    },
    
    {
        id: 12,
        nombre: "rampa de autos",
        material: "madera",
        color: "rojo",
        montessori: false,
        precio: 25000
    },
    
    {
        id: 13,
        nombre: "juego de platos",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 25000
    },
    
   {
        id: 14,
        nombre: "equilibristas",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 15000
    },
    
   {
        id: 15,
        nombre: "animales",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 10000
    }
    
];

let cartProducts = [];
let productos = document.getElementById("juegos");
let stockMessage = document.getElementById("stock-message");
let totalMessage = document.getElementById("total-message");
let cartProductsDiv = document.getElementById("cart-products");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let productSelect = document.getElementById("product-select");
let selectButton = document.getElementById("select-button");

function renderProductos(juegosArray) {
    juegosArray.forEach(juego => {
        const card = document.createElement("div");
        card.innerHTML = `<h3>Juego: ${juego.nombre}</h3>
                            <h4>Precio: ${juego.precio}</h4>
                            <button class="productoAgregar" id="${juego.id}">Agregar</button>`;
        productos.appendChild(card);
    });
}

renderProductos(juegos);

function addToCartButton() {
    const addButtons = document.querySelectorAll(".productoAgregar");
    addButtons.forEach(button => {
        button.onclick = (e) => {
            const juegoId = e.currentTarget.id;
            const selectedJuego = juegos.find(juego => juego.id == juegoId);
            if (selectedJuego) {
                cartProducts.push(selectedJuego);
                updateCart();
            }
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        }
    });
}

addToCartButton();

let sumar = document.getElementById("plus-button");
let restar = document.getElementById("minus-button");
let counter = document.getElementById("counter");
let contador = 0;

sumar.onclick = () => {
    contador++;
    counter.innerHTML = contador;
    restar.disabled = false;
}

restar.onclick = () => {
    if (contador === 0) {
        restar.disabled = true;
    } else {
        contador--;
        counter.innerHTML = contador;
    }
}

function checkStock(juegoNombre) {
    return juegos.some(juego => juego.nombre.toLowerCase() === juegoNombre.toLowerCase());
}

function updateCart() {
    cartProductsDiv.innerHTML = `<h3>Productos en el carrito:</h3>`;
    cartProducts.forEach(producto => {
        cartProductsDiv.innerHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
    });
}

function updateTotal(total) {
    totalMessage.innerHTML = `El total de tu pedido es: $${total}`;
}

searchButton.onclick = () => {
    let buscar = searchInput.value;
    if (checkStock(buscar)) {
        stockMessage.innerHTML = "Lo tenemos! Continúe con su compra";
    } else {
        stockMessage.innerHTML = "Lamentablemente, el juego buscado no se encuentra en stock";
    }
};

selectButton.onclick = () => {
    let seleccion = parseInt(productSelect.value);
    if (isNaN(seleccion) || seleccion < 1 || seleccion > 15) {
        totalMessage.innerHTML = "Debes elegir una opción válida";
        return;
    }
    total += juegos[seleccion - 1].precio;
    updateTotal(total);

    let confirmacion = confirm("¿Deseas seguir comprando?");
    if (!confirmacion) {
        return;
    }
};