// buscar producto
let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
let stockMessage = document.getElementById("stock-message");
let selectButton = document.getElementById("select-button");
let productSelect = document.getElementById("product-select");

searchButton.onclick = () => {
    let buscar = searchInput.value;
    if (checkStock(buscar)) {
        stockMessage.innerHTML = "Lo tenemos! Continúe con su compra";
    } else {
        stockMessage.innerHTML = "Lamentablemente, el juego buscado no se encuentra en stock";
    }
};

// productos

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
let totalMessage = document.getElementById("total-message");
let cartProductsDiv = document.getElementById("cart-products");

// rend productos
function renderProductos(juegosArray) {
    productos.innerHTML = "";
    juegosArray.forEach(juego => {
        const card = document.createElement("div");
        card.classList.add("producto-card");
        card.innerHTML = `
            <h3>Juego: ${juego.nombre}</h3>
            <h4>Precio: $${juego.precio}</h4>
            <button class="productoSumar" data-id="${juego.id}">+</button>
            <button class="productoRestar" data-id="${juego.id}">-</button>
            <span class="cantidadProducto" data-id="${juego.id}">Cantidad: 0</span>
        `;
        productos.appendChild(card);
    });
}

// update cantidad por producto
function updateProductQuantity(productId, quantity) {
    const quantitySpan = document.querySelector(`.cantidadProducto[data-id="${productId}"]`);
    if (quantitySpan) {
        quantitySpan.textContent = `Cantidad: ${quantity}`;
    }
}

// agregar productos al carrito
function addToCartButton() {
    const sumarButtons = document.querySelectorAll(".productoSumar");
    const restarButtons = document.querySelectorAll(".productoRestar");

    sumarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            const selectedJuego = juegos.find(juego => juego.id === juegoId);

            if (selectedJuego) {
                const existingProduct = cartProducts.find(product => product.id === juegoId);
                if (existingProduct) {
                    existingProduct.cantidad++;
                } else {
                    cartProducts.push({ ...selectedJuego, cantidad: 1 });
                }
                updateProductQuantity(juegoId, existingProduct ? existingProduct.cantidad : 1);
                updateCart();
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });

    restarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            const selectedJuego = cartProducts.find(product => product.id === juegoId);

            if (selectedJuego) {
                if (selectedJuego.cantidad > 1) {
                    selectedJuego.cantidad--;
                    updateProductQuantity(juegoId, selectedJuego.cantidad);
                } else {
                    cartProducts = cartProducts.filter(product => product.id !== juegoId);
                    updateProductQuantity(juegoId, 0);
                }
                updateCart();
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });
}

// update del carrito
function updateCart() {
    cartProductsDiv.innerHTML = "";
    let total = 0;

    cartProducts.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <h3>${product.nombre} (x${product.cantidad})</h3>
            <h4>Total: $${product.precio * product.cantidad}</h4>
            <button class="eliminarProducto" data-id="${product.id}">Eliminar</button>
        `;
        cartProductsDiv.appendChild(cartItem);

        total += product.precio * product.cantidad;
    });

    totalMessage.innerText = `Total del carrito: $${total}`;

// eventos para eliminar productos
    document.querySelectorAll(".eliminarProducto").forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            removeProduct(juegoId);
        });
    });
}

// sacar un producto del carrito
function removeProduct(juegoId) {
    cartProducts = cartProducts.filter(product => product.id !== juegoId);
    updateCart();
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

// elminar carrito
function emptyCart() {
    cartProducts = [];
    updateCart();
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

// carrito dom
document.addEventListener("DOMContentLoaded", () => {
    renderProductos(juegos);
    addToCartButton();
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProducts = storedCart;
    updateCart();
});

// vaciar carrito
let emptyCartButton = document.getElementById("empty-cart-button");
emptyCartButton.onclick = () => {
    emptyCart();
};

// verificar si hay stock
function checkStock(juegoNombre) {
    return juegos.some(juego => juego.nombre.toLowerCase() === juegoNombre.toLowerCase());
}