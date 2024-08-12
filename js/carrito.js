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