const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
const user = JSON.parse(localStorage.getItem("user"));
const summaryContainer = document.getElementById("purchase-summary");
const loggedInSection = document.getElementById("logged-in-section");
const loginButton = document.getElementById("login-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("login-message");

// productos del carrito
function displayCartItems() {
    summaryContainer.innerHTML = "";
    if (cartItems.length === 0) {
        summaryContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        let total = 0;
        cartItems.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            summaryContainer.innerHTML += `
                <div class="carrito-juego">
                    <h3>${item.nombre}</h3>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio: $${item.precio}</p>
                    <p>Subtotal: $${subtotal}</p>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
        });

        // total
        summaryContainer.innerHTML += `<h3>Total: $${total}</h3>`;
    }
}

displayCartItems();

// inicio de sesión
loginButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username && password) {
        localStorage.setItem("user", JSON.stringify({ username }));
        loginMessage.textContent = "Sesión iniciada.";
        loggedInSection.innerHTML = `<h2>Gracias por tu compra, ${username}!</h2>`;
    } else {
        loginMessage.textContent = "Por favor, ingrese usuario y contraseña.";
    }
});

// eliminar producto individual
summaryContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = parseInt(event.target.dataset.index);
        cartItems.splice(index, 1);
        localStorage.setItem("cartProducts", JSON.stringify(cartItems));
        displayCartItems(); 
    }
});

// finalizar compra
document.getElementById("finalizar-compra").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        const total = cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
        
        Swal.fire({
            title: 'Resumen de Compra',
            html: `
                <h3>Gracias por tu compra, ${user.username}!</h3>
                ${cartItems.map(item => `
                    <div style="margin-bottom: 10px;">
                        <h4>${item.nombre}</h4>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio: $${item.precio}</p>
                        <p>Subtotal: $${item.precio * item.cantidad}</p>
                    </div>
                `).join('')}
                <hr>
                <h4>Total: $${total}</h4>
            `,
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#28a745'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("cartProducts");
                localStorage.removeItem("user");
                summaryContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
            }
        });
    } else {
        Toastify({
            text: "Por favor, inicie sesión para completar la compra.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff0000, #ff4d4d)"
        }).showToast();
    }
});
