let cartContainer = document.getElementById("cart-section")

let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

function renderCarrito(cartItems){
    const cart = document.createElement("div")
    cart.innerHTML = `<h3>${juego.nombre}</h3>
                      <p>${juego.precio}</>`
    cartContainer.appendChild(cart)
}

renderCarrito(cartStorage)

document.getElementById("finalizar-compra").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
        window.location.href = "./html/resumen.html"; // redirigir al resumen
    } else {
        Swal.fire('Error', 'Por favor inicia sesión para continuar', 'error');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));
    const summaryContainer = document.getElementById("purchase-summary");

    if(cartItems.length === 0) {
        summaryContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        let total = 0;
        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            summaryContainer.innerHTML += `
                <div class="carrito-juego">
                    <h3>${item.name}</h3>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio: $${item.price}</p>
                    <p>Subtotal: $${subtotal}</p>
                </div>
            `;
        });
        summaryContainer.innerHTML += `<h3>Total: $${total}</h3>`;
    }

    document.getElementById("logged-in-section").innerHTML = `<h2>Gracias por tu compra, ${user.username}!</h2>`;
});


document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));
    const summaryContainer = document.getElementById("purchase-summary");
    const loggedInSection = document.getElementById("logged-in-section");

    // mostrar saludo al usuario logueado
    if (user) {
        loggedInSection.innerHTML = `<h2>Gracias por tu compra, ${user.username}!</h2>`;
    } else {
        loggedInSection.innerHTML = `<h2>Usuario no identificado.</h2>`;
    }

    // mostrar los productos del carrito
    if (cartItems.length === 0) {
        summaryContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        let total = 0;
        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            summaryContainer.innerHTML += `
                <div class="carrito-juego">
                    <h3>${item.name}</h3>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio: $${item.price}</p>
                    <p>Subtotal: $${subtotal}</p>
                </div>
            `;
        });

        // mostrar total
        summaryContainer.innerHTML += `<h3>Total: $${total}</h3>`;
    }
});
