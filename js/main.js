
//bienvenidos

function saludar () {
    console.log ("¡Bienvenidos!")
    alert("Bienvenidos a El Taller")
}
saludar ()

//array de productos
const juego = ["balancin", "torre de aprendizaje", "tobogan", "sube y baja", "rampa", "juguete de arrastre", "pata pata", "hamaca", "tablero sensorial", "xilofon", "encastre", "rampa de autos", "juego de platos", "equilibristas", "animales" ]
console.log(juego)
console.log(juego.sort())

// objetos (no se si esta bien, pero intente ir haciendolos mientras miraba la clase)

const Juego1 = {
    juego: "balancin",
    material: "madera",
    color: "multicolor",
    montessori: true,
}

const Juego2 = {
    juego: "torre de aprendizaje",
    material: "madera",
    color: "marron",
    montessori: true,
}

const Juego3 = {
    juego: "tobogan",
    material: "madera",
    color: "celeste",
    montessori: false,
}

const Juego4 = {
    juego: "sube y baja",
    material: "madera",
    color: "multicolor",
    montessori: false,
}

const Juego5 = {
    juego: "rampa",
    material: "madera",
    color: "multicolor",
    montessori: true,
}

const Juego6 = {
    juego: "juguete de arrastre",
    material: "madera",
    color: "verde",
    montessori: false,
}

const Juego7 = {
    juego: "pata pata",
    material: "madera",
    color: "multicolor",
    montessori: true,
}

const Juego8 = {
    juego: "hamaca",
    material: "madera",
    color: "multicolor",
    montessori: false,
}

const Juego9 = {
    juego: "tablero sensorial",
    material: "madera",
    color: "rosa",
    montessori: true,
}

const Juego10 = {
    juego: "xilofon",
    material: "madera",
    color: "multicolor",
    montessori: false,
}

const Juego11 = {
    juego: "encastre",
    material: "madera",
    color: "multicolor",
    montessori: true,
}

const Juego12 = {
    juego: "rampa de autos",
    material: "madera",
    color: "rojo",
    montessori: false,
}

const Juego13 = {
    juego: "juego de platos",
    material: "madera",
    color: "marron",
    montessori: false,
}

const Juego14 = {
    juego: "equilibristas",
    material: "madera",
    color: "marron",
    montessori: false,
}

const Juego15 = {
    juego: "animales",
    material: "madera",
    color: "marron",
    montessori: false,
}

const juegos = [Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7, Juego8, Juego9, Juego10, Juego11, Juego12, Juego13, Juego14, Juego15]

//edad para comprar en la tienda

let edad;
do {
    edad = parseInt(prompt("Por favor, contanos tu edad para poder ingresar a la tienda"));
    if (edad >= 18) {
        alert("Sos mayor de 18 años, podés ingresar a la tienda");
    } else {
        alert("Lo sentimos, no podés ingresar a la tienda");
    }
} while (edad < 18);

// precios de todos los productos

let continuar = true
let total = 0

const precios = {
    1: 10000, // precio animales
    2: 50000, // precio balancin
    3: 15000, // precio encastre
    4: 15000, // precio equilibristas
    5: 20000, // precio hamaca
    6: 25000, // precio juego de platos
    7: 40000, // precio juguete de arrastre
    8: 45000, // precio pata pata
    9: 50000, // precio rampa
    10: 25000, // precio rampa de autos
    11: 40000, // precio sube y baja
    12: 30000, // precio tablero sensorial
    13: 40000, // precio tobogan
    14: 50000, // precio torre de aprendizaje
    15: 25000, // precio xilofon
}

// el cliente selecciona el o los productos para comprar, que se van sumando al total 

while (continuar) {
    let juegos = parseInt(prompt("Elegí el producto que deseas: \n 1-Animales \n 2-Balancin \n 3-Encastre \n 4-Equilibristas \n 5-Hamaca \n 6-Juego de platos \n 7-Juguete de arrastre \n 8-Pata Pata \n 9-Rampa \n 10-Rampa de autos \n 11-Sube y baja \n 12-Tablero Sensorial \n 13-Tobogan \n 14-Torre de Aprendizaje \n 15-Xilofon"));
    switch(juegos){
        case 1:
            alert("Elegiste Animales")
            total+=precios[1] //Sumar el precio al total
            break
        case 2:
            alert("Elegiste Balancin")
            total+=precios[2] //Sumar el precio al total
            break
        case 3:
            alert("Elegiste Encastre")
            total+=precios[3] //Sumar el precio al total
            break 
        case 4:
            alert("Elegiste Equilibrista")
            total+=precios[4] //Sumar el precio al total
            break 
        case 5:
            alert("Elegiste Hamaca")
            total+=precios[5] //Sumar el precio al total
            break 
        case 6:
            alert("Elegiste Juego de platos")
            total+=precios[6] //Sumar el precio al total
            break  
        case 7:
            alert("Elegiste Juguete de arrastre")
            total+=precios[7] //Sumar el precio al total
            break 
        case 8:
            alert("Elegiste Pata Pata")
            total+=precios[8] //Sumar el precio al total
            break
        case 9:
            alert("Elegiste Rampa")
            total+=precios[9] //Sumar el precio al total
            break 
        case 10:
            alert("Elegiste Rampa de Autos")
            total+=precios[10] //Sumar el precio al total
            break
        case 11:
            alert("Elegiste Sube y Baja")
            total+=precios[11] //Sumar el precio al total
            break
        case 12:
            alert("Elegiste Tablero Sensorial")
            total+=precios[12] //Sumar el precio al total
            break
        case 13:
            alert("Elegiste Tobogan")
            total+=precios[13] //Sumar el precio al total
            break
        case 14:
            alert("Elegiste Torre de Aprendizaje")
            total+=precios[14] //Sumar el precio al total
            break  
        case 15:
            alert("Elegiste Xilofon")
            total+=precios[15] //Sumar el precio al total
            break
        default:
            alert("Debes elegir una opción válida")
            break    
    }

    let confirmacion = prompt("¿Deseas seguir comprando? (si/no)")
    if(confirmacion =="no"){
        continuar = false
    }
}

alert("El total de tu pedido es: $" +total)

//redireccionar despues de elegir los productos sumados al carrito a la sección de pago (entiendo que cuando haga el html se va a entender mejor)

function redirectPagar(){
    alert("Usted está siendo redirigido a la sección PAGAR")

    let elegir;
    const NombreUsuario = "Usuario"
    const Contraseña = "Contraseña"
    
    while (true) {
        elegir = prompt("Hola, " + NombreUsuario + " ¿Qué medio de pago deseas utilizar para finalizar tu compra?: \n 1: Transferencia \n 2: Tarjeta de Débito \n 3: Tarjeta de Crédito \n 4: Mercado Pago");
        switch (parseInt(elegir)) { 
            case 1:
                Transferencia();
                alert("Elegiste pagar con Transferencia");
                break;
            case 2:
                TarjetaDebito();
                alert("Elegiste pagar con Tarjeta de Débito");
                break;
            case 3:
                TarjetaCredito();
                alert("Elegiste pagar con Tarjeta de Crédito");
                break;
            case 4:
                MercadoPago();
                alert("Elegiste pagar con Mercado Pago");
                break;
            default:
                alert("Elija una opción de pago válida");
                continue; 
        }
        break; 
    }
}
    
// Funciones a partir de la seleccion de pago

function Transferencia() {
    console.log("Procesando transferencia...");
    const cuentaDestino = prompt("Ingresa el número de cuenta destino: ");
    const monto = prompt("Ingresa el monto a transferir: ");
    console.log("Transferencia a la cuenta ${cuentaDestino} por un monto de ${monto}");
}

function TarjetaDebito() {
    console.log("Procesando pago con tarjeta de débito...");
        const numeroTarjeta = prompt("Ingresa el número de tu tarjeta de débito: ");
        const fechaExpiracion = prompt("Ingresa la fecha de expiración (MM/AA): ");
        const codigoSeguridad = prompt("Ingresa el código de seguridad (CVV): ");
        console.log("Pago con tarjeta de débito ${numeroTarjeta}, expiración ${fechaExpiracion}, CVV ${codigoSeguridad}");
    }

function TarjetaCredito () {
        console.log("Procesando pago con tarjeta de crédito...");
        const numeroTarjeta = prompt("Ingresa el número de tu tarjeta de crédito:");
        const fechaExpiracion = prompt("Ingresa la fecha de expiración (MM/AA):");
        const codigoSeguridad = prompt("Ingresa el código de seguridad (CVV):");
        console.log("Pago con tarjeta de crédito ${numeroTarjeta}, expiración ${fechaExpiracion}, CVV ${codigoSeguridad}");
    }

function MercadoPago() {
        console.log("Procesando pago con Mercado Pago...");
        const email = prompt("Ingresa el email asociado a tu cuenta de Mercado Pago:");
        const monto = prompt("Ingresa el monto a pagar:");
        console.log(`Pago con Mercado Pago desde el email ${email} por un monto de ${monto}`);
    }

// aclaracion: para las cosas de pago me fui ayudando con chat gpt y material adicional, de ser necesario por favor no duden en corregirme!

