
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const stockMessage = document.getElementById("stock-message");
const productos = document.getElementById("products-container");
const totalMessage = document.getElementById("total-message");
const cartProductsDiv = document.getElementById("cart-products");
const cartLogo = document.getElementById('cart-logo');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart-button');
const emptyCartButton = document.getElementById('empty-cart-button');
const finalizarCompraButton = document.getElementById('finalizar-compra');
const purchaseMessage = document.getElementById('purchase-message');
const loginButton = document.getElementById('login-button');
const loggedInSection = document.getElementById('logged-in-section');
const purchaseSummary = document.getElementById('purchase-summary');

// productos (NUEVO: se cargan desde un archivo JSON)
let juegos = [];
fetch('./db/data.json')
    .then(response => response.json())
    .then(data => {
        juegos = data;
        renderProductos(juegos);
    })
    .catch(error => console.error('Error cargando los productos:', error));

// cargar productos del carrito desde localStorage
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// función para verificar stock
function checkStock(juegoNombre) {
    return juegos.some(juego => juego.nombre.toLowerCase() === juegoNombre.toLowerCase());
}

// función para manejar la búsqueda de productos
searchButton.onclick = () => {
    const buscar = searchInput.value.trim();

    try { 
        if (!buscar) throw new Error("El campo de búsqueda está vacío.");
        
        if (checkStock(buscar)) {
            stockMessage.innerHTML = "Lo tenemos! Continúe con su compra";
        } else {
            stockMessage.innerHTML = "Lamentablemente, el juego buscado no se encuentra en stock";
        }

    } catch (error) {
        stockMessage.innerHTML = `Error: ${error.message}`;
    } finally {
        stockMessage.style.display = 'block';  
    }
};

// renderizar productos 
function renderProductos(juegosArray) {
    productos.innerHTML = "";
    juegosArray.forEach(juego => {
        const card = document.createElement("div");
        card.classList.add("juego");
        card.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <h3>Juego: ${juego.nombre}</h3>
            <h4>Precio unitario: $${juego.precio}</h4>
            <button class="productoSumar" data-id="${juego.id}">+</button>
            <button class="productoRestar" data-id="${juego.id}">-</button>
        `;
        productos.appendChild(card);
    });

    addToCartButton(); 
}

// función para actualizar el carrito
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

    // actualizar eventos para eliminar productos
    document.querySelectorAll(".eliminarProducto").forEach(button => {
        button.addEventListener("click", (e) => {
            const juegoId = parseInt(e.currentTarget.dataset.id);
            removeProduct(juegoId);
        });
    });
}

// función para añadir productos al carrito
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
                }
                if (existingProduct.cantidad === 0) {
                    cartProducts = cartProducts.filter(product => product.id !== juegoId);
                }
                updateCart();
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            }
        });
    });
}

// función para vaciar carrito
function emptyCart() {
    cartProducts = [];
    localStorage.removeItem('cartProducts');
    updateCart();
    Swal.fire({
        icon: 'success',
        title: 'Carrito vaciado',
        text: 'Tu carrito de compras ha sido vaciado correctamente',
        timer: 2000
    });
}

emptyCartButton.addEventListener('click', emptyCart);

// función para finalizar compra
function finalizePurchase() {
    Swal.fire({
        title: 'Completa tus datos',
        html: `
            <input id="name" class="swal2-input" placeholder="Nombre">
            <input id="email" class="swal2-input" placeholder="Email">
        `,
        confirmButtonText: 'Finalizar Compra',
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const email = Swal.getPopup().querySelector('#email').value;
            if (!name || !email) {
                Swal.showValidationMessage('Por favor ingresa tu nombre y email');
            }
            return { name, email };
        }
    }).then(result => {
        const { name, email } = result.value;
        if (name && email) {
            purchaseMessage.innerText = `Compra finalizada con éxito! Gracias ${name} por tu compra.`;
            localStorage.removeItem('cartProducts');
            cartProducts = [];
            updateCart();
            Swal.fire('Compra Finalizada', 'Gracias por tu compra!', 'success');
        }
    });
}

finalizarCompraButton.addEventListener('click', finalizePurchase);

// mostrar/ocultar el carrito al hacer clic en el logo
cartLogo.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

// cerrar el carrito
closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// manejo de inicio de sesión
loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username }));
        Swal.fire('Login exitoso', `Bienvenido ${username}`, 'success');
        loggedInSection.classList.remove("hidden");
        showPurchaseSummary({ name: username });
    } else {
        Swal.fire('Error', 'Por favor ingresa tus credenciales', 'error');
    }
});

// mostrar resumen de compra
function showPurchaseSummary(user) {
    loggedInSection.classList.remove('hidden');
    const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
    let total = 0;

    purchaseSummary.innerHTML = `
        <h3>Usuario: ${user.name}</h3>
        <ul>
            ${cartItems.map(item => {
                total += item.precio * item.cantidad;
                return `<li>${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio}</li>`;
            }).join('')}
        </ul>
        <p><strong>Total:</strong> $${total}</p>
    `;
}

// función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCount = document.querySelector("#cart-icon .cart-count");
    const totalItems = cartItems.reduce((total, item) => total + item.cantidad, 0);
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove("hidden");
    } else {
        cartCount.classList.add("hidden");
    }
}

// función para actualizar el total y el precio acumulado en las cards
function updateCartTotals() {
    const totalContainer = document.getElementById("total-message");
    if (cartItems.length > 0) {
        let total = cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        totalContainer.innerHTML = `Total del carrito: $${total}`;
    } else {
        totalContainer.innerHTML = "";
    }
}

// llama a las funciones para actualizar el contador y los totales cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    updateCartTotals();
});

// manejo de eventos para agregar y eliminar productos
document.getElementById("add-product-button").addEventListener("click", () => {
    const product = {
        nombre: "Producto Ejemplo",
        precio: 100,
        cantidad: 1
    };
    addToCart(product);
});

summaryContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.dataset.index);
        removeFromCart(index);
        displayCartItems(); 
    }
});

// actualiza el contador y el total cuando se carga la página
updateCartCounter();
updateCartTotals();