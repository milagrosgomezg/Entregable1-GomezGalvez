
// buscar producto
let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
let stockMessage = document.getElementById("stock-message");
let selectButton = document.getElementById("select-button");
let productSelect = document.getElementById("product-select");

// verificar si hay stock
function checkStock(juegoNombre) {
    return juegos.some(juego => juego.nombre.toLowerCase() === juegoNombre.toLowerCase());
}

searchButton.onclick = () => {
    let buscar = searchInput.value;

try { 
    // intentar realizar la búsqueda
    if (!buscar) throw new Error("El campo de búsqueda está vacío.");
    
    if (checkStock(buscar)) {
        stockMessage.innerHTML = "Lo tenemos! Continúe con su compra";
    } else {
        stockMessage.innerHTML = "Lamentablemente, el juego buscado no se encuentra en stock";
    }

    } catch (error) {
    // capturar y mostrar cualquier error
    stockMessage.innerHTML = `Error: ${error.message}`;
    } finally {
    stockMessage.style.display = 'block';  
    }
};

// productos
const juegos = [
   
    {
        id: 1,
        nombre: "balancin",
        imagen: "../css/balancin.jpg",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 50000,
    },
   {
        id: 2,
        nombre: "torre de aprendizaje",
        imagen: "../css/torre-aprendizaje.jpg",
        material: "madera",
        color: "marron",
        montessori: true,
        precio: 50000
    },
    {
        id: 3,
        nombre: "tobogan",
        imagen: "../css/tobogan.jpg",
        material: "madera",
        color: "celeste",
        montessori: false,
        precio: 40000
    },
    
    {
        id: 4,
        nombre: "sube y baja",
        imagen: "../css/sube-baja.jpg",
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 40000
    },
    
   {
        id: 5,
        nombre: "rampa",
        imagen: "../css/rampa.png",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 50000
    },
    
    {
        id: 6,
        nombre: "juguete de arrastre",
        imagen: "../css/juguete-arrastre.jpg",
        material: "madera",
        color: "verde",
        montessori: false,
        precio: 40000
    },
    
   {
        id: 7,
        nombre: "pata pata",
        imagen: "../css/pata-pata.jpg" ,
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 45000
    },
    
    {
        id: 8,
        nombre: "hamaca",
        imagen: "../css/hamaca.jpeg" ,
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 20000
    },
    
    {
        id: 9,
        nombre: "tablero sensorial",
        imagen: "../css/tablero-sensorial.png",
        material: "madera",
        color: "rosa",
        montessori: true,
        precio: 30000
    },
    
   {
        id: 10,    
        nombre: "xilofon",
        imagen: "../css/xilofon.png",
        material: "madera",
        color: "multicolor",
        montessori: false,
        precio: 25000
    },
    
  {
        id: 11,
        nombre: "encastre",
        imagen: "../css/encastre.jpg",
        material: "madera",
        color: "multicolor",
        montessori: true,
        precio: 15000
    },
    
    {
        id: 12,
        nombre: "rampa de autos",
        imagen: "../css/rampa-autos.jpeg",
        material: "madera",
        color: "rojo",
        montessori: false,
        precio: 25000
    },
    
    {
        id: 13,
        nombre: "juego de platos",
        imagen: "../css/juego-platos (1).jpeg",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 25000
    },
    
   {
        id: 14,
        nombre: "equilibristas",
        imagen: "../css/equilibristas.jpeg",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 15000
    },
    
   {
        id: 15,
        nombre: "animales",
        imagen: "../css/animales.jpeg",
        material: "madera",
        color: "marron",
        montessori: false,
        precio: 10000
    }
    
];

let cartProducts = [];
let productos = document.getElementById("products-container");
let totalMessage = document.getElementById("total-message");
let cartProductsDiv = document.getElementById("cart-products");

document.addEventListener('DOMContentLoaded', function() {
    renderProductos(juegos);
    addToCartButton();
    const cartLogo = document.getElementById('cart-counter');
    const cartCounter = document.getElementById('cart-counter'); 
    const finalizarCompraButton = document.getElementById('finalizar-compra');
    const purchaseMessage = document.getElementById('purchase-message');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const stockMessage = document.getElementById('stock-message');
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const closeCartButton = document.getElementById('close-cart-button');
    const emptyCartButton = document.querySelector('button[onclick="emptyCart()"]');

    let cartProducts = [];
})

let cart = JSON.parse(localStorage.getItem('cart')) || {};
let products = [
    { id: 1, name: 'Balancin', price: 50000 },
    { id: 2, name: 'Torre de aprendizaje', price: 50000 },
    { id: 3, name: 'Tobogan', price: 40000 },
    { id: 4, name: 'Sube y Baja', price: 40000 },
    { id: 5, name: 'Rampa', price: 50000 },
    { id: 6, name: 'Juguete de arrastre', price: 40000 },
    { id: 7, name: 'Pata Pata', price: 45000 },
    { id: 8, name: 'Hamaca', price: 20000 },
    { id: 9, name: 'Tablero Sensorial', price: 30000 },
    { id: 10, name: 'Xilofon', price: 25000 },
    { id: 11, name: 'Encastre', price: 15000 },
    { id: 12, name: 'Rampa de autos', price: 25000 },
    { id: 13, name: 'Juego de platos', price: 25000 },
    { id: 14, name: 'Equilibristas', price: 15000 },
    { id: 15, name: 'Animales', price: 10000 },
];

// función para finalizar compra con manejo de errores
function finalizePurchase() {
    try {
        // verificar si hay productos en el carrito
        if (cartProducts.length === 0) {
            throw new Error("Tu carrito está vacío. Agrega productos para finalizar la compra.");
        }

        // simular el proceso de compra (por ejemplo, enviar datos al servidor)
        purchaseMessage.innerText = "Procesando tu compra...";

        // si todo va bien, mostrar éxito
        setTimeout(() => {
            purchaseMessage.innerText = "¡Compra finalizada con éxito! Gracias por elegir KIDOSSORI.";
            emptyCart(); 
        }, 1000); // simula que hay retardo en el procesamiento

    } catch (error) {
        // mostrar mensaje de error al usuario
        purchaseMessage.innerText = `Error: ${error.message}`;
    } finally {
        console.log("Finalización del intento de compra.");
    }
}
    
 // actualizar el contador de productos en el carrito
 function updateCartCounter() {
    const totalItems = cartProducts.reduce((acc, product) => acc + product.cantidad, 0);
    cartCounter.innerText = totalItems;
}

// renderizar productos
function renderProductos(juegosArray) {
    productos.innerHTML = "";
    juegosArray.forEach(juego => {
        const card = document.createElement("div");
        card.classList.add("juego");
        card.innerHTML = `
            <img src="./css/${juego.imagen}"
            <h3>Juego: ${juego.nombre}</h3>
            <h4>Precio unitario: $${juego.precio}</h4>
            <button class="productoSumar" data-id="${juego.id}">+</button>
            <button class="productoRestar" data-id="${juego.id}">-</button>
            <span class="cantidadProducto" data-id="${juego.id}">Cantidad: 0</span>
            <span class="costoTotalProducto" data-id="${juego.id}">Costo Total: $0</span>
        `;
        productos.appendChild(card);
    });
}

// actualizar cantidad por producto y el costo total por producto
function updateProductQuantityAndCost(productId, quantity, totalCost) {
    const quantitySpan = document.querySelector(`.cantidadProducto[data-id="${productId}"]`);
    const totalCostSpan = document.querySelector(`.costoTotalProducto[data-id="${productId}"]`);

    if (quantitySpan && totalCostSpan) {
        quantitySpan.textContent = `Cantidad: ${quantity}`;
        totalCostSpan.textContent = `Costo Total: $${totalCost}`;
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
                const cantidad = existingProduct ? existingProduct.cantidad : 1;
                updateProductQuantityAndCost(juegoId, cantidad, selectedJuego.precio * cantidad);
                updateCart();
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });

    restarButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            const existingProduct = cartProducts.find(product => product.id === juegoId);

            if (existingProduct) {
                if (existingProduct.cantidad > 0) {
                    existingProduct.cantidad--;
                } else {
                    cartProducts = cartProducts.filter(product => product.id !== juegoId);
                }
                const cantidad = existingProduct ? existingProduct.cantidad : 0;
                updateProductQuantityAndCost(juegoId, cantidad, existingProduct ? existingProduct.precio * cantidad : 0);
                updateCart();
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Toastify({
        text: "Producto añadido al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: 'right',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}

// actualizar el carrito
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

// actualizar el contador del carrito
    function updateCartCounter() {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
    }

// función para actualizar el carrito en el modal
function updateCartModal() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
    for (const [id, item] of Object.entries(cart)) {
        const product = products.find(p => p.id == id);
        totalPrice += product.price * item.quantity;
        cartItems.innerHTML += `
            <div>
                <p>${product.name}: ${item.quantity} x $${product.price}</p>
            </div>
        `;
    }
    cartItems.innerHTML += `<p>Total: $${totalPrice}</p>`;
}

    // eventos para eliminar productos
    document.querySelectorAll(".eliminarProducto").forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            removeProduct(juegoId);
        });
    });
}

// remover producto del carrito
function removeProduct(juegoId) {
    cartProducts = cartProducts.filter(product => product.id !== juegoId);
    updateCart();
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity -= 1;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        updateCartModal();
        showSuccessMessage('Producto eliminado del carrito');
    }
}


// función para finalizar la compra
function finalizePurchase() {
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        showConfirmButton: false,
        timer: 1500
    });
    localStorage.removeItem('cart');
    cart = {};
    updateCartCounter();
    updateCartModal();
}

// inicializar productos y eventos
renderProductos(juegos);
addToCartButton();
const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
cartProducts = storedCart;
updateCart();

// mostrar/ocultar el carrito al hacer clic en el logo
cartLogo.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

// cerrar el carrito
closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// vaciar carrito
let emptyCartButton = document.getElementById("empty-cart-button");
emptyCartButton.onclick = () => {
    emptyCart();
};  

let container = document.getElementById("products-container")

const finalizarCompraButton = document.getElementById('finalizar-compra');
if (finalizarCompraButton) {
    finalizarCompraButton.addEventListener('click', function() {
        window.location.href = './html/carrito.html'; 
    });
}

fetch("./db/data.json")
.then(response => response.json())
.then(data => {
    data.forEach(product => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>Id: ${product.id}</h3>
                           <h3>Nombre: ${product.nombre}</h3>
                           <h3>Material: ${product.material}</h3>
                           <h3>Color: ${product.color}</h3> 
                           <h3>Montessori: ${product.montessori}</h3>
                           <h3>Precio: ${product.precio}</h3>`
            container.appendChild(card)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginMessage = document.getElementById('login-message');
    const loggedInSection = document.getElementById('logged-in-section');
    const purchaseSummary = document.getElementById('purchase-summary');
    
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username-input').value;

        if (username) {
            // sim de inicio de sesión
            fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const user = data[0];
                        loginMessage.textContent = `Bienvenido, ${user.name}`;
                        
                        // Mostrar resumen de compra
                        showPurchaseSummary(user);
                    } else {
                        loginMessage.textContent = 'Usuario no encontrado';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    loginMessage.textContent = 'Error al iniciar sesión';
                });
        } else {
            loginMessage.textContent = 'Por favor, ingresa un nombre de usuario';
        }
    });

    document.getElementById("login-button").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        if(username && password) {
            localStorage.setItem("user", JSON.stringify({ username }));
            Swal.fire('Login exitoso', `Bienvenido ${username}`, 'success');
            // muestra sección de resumen de compra después del login
            document.getElementById("logged-in-section").classList.remove("hidden");
        } else {
            Swal.fire('Error', 'Por favor ingresa tus credenciales', 'error');
        }
    });

    function showPurchaseSummary(user) {
        loggedInSection.classList.remove('hidden');

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        purchaseSummary.innerHTML = `
            <h3>Usuario: ${user.name}</h3>
            <ul>
                ${cartItems.map(item => {
                    total += item.price * item.quantity;
                    return `<li>${item.title} - Cantidad: ${item.quantity} - Precio: $${item.price}</li>`;
                }).join('')}
            </ul>
            <p><strong>Total:</strong> $${total}</p>
        `;
    }
});