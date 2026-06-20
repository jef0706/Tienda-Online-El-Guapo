'use strict';

// =====================================
// EL GUAPO - ROPA PARA BEBÉS
// Proyecto AAT1 - Intecap
// Alexander Gómez
// =====================================

// ======================
// CONSTANTES
// ======================
const IVA = 0.12;
const carritoTexto = document.querySelector(".cart");
const botonesComprar = document.querySelectorAll(".btn-comprar");
const emailInput = document.getElementById("correo");
const btnEnviar = document.getElementById("btnSuscribir");

// ======================
// VARIABLES
// ======================
let carrito = [];
let totalProductos = 0;
let totalCompra = 0;
let totalConIVA = 0;
let suscriptores = [];

// ======================
// ARRAY DE OBJETOS
// ======================
const productos = [
    {
        id: 1,
        nombre: "Chaqueta Baby",
        precio: 120,
        categoria: "Niños"
    },
    {
        id: 2,
        nombre: "Pijama Suave",
        precio: 95,
        categoria: "Niñas"
    },
    {
        id: 3,
        nombre: "Conjunto Premium",
        precio: 140,
        categoria: "Niños"
    },
    {
        id: 4,
        nombre: "Body Clásico",
        precio: 80,
        categoria: "Niñas"
    }
];

// ======================
// FUNCIONES
// ======================

// Actualizar carrito
function actualizarCarrito() {
    carritoTexto.textContent = `🛒 Carrito (${totalProductos})`;
}

// Calcular total
function calcularTotal() {

    totalCompra = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.precio;
    }, 0);

    totalConIVA = totalCompra + (totalCompra * IVA);

    return totalConIVA;
}

// Mostrar resumen
function mostrarResumen() {

    calcularTotal();

    Swal.fire({
        title: "Producto agregado",
        html: `
            <b>Productos:</b> ${totalProductos}<br>
            <b>Subtotal:</b> Q${totalCompra.toFixed(2)}<br>
            <b>Total + IVA:</b> Q${totalConIVA.toFixed(2)}
        `,
        icon: "success",
        confirmButtonText: "Aceptar"
    });

}

// Agregar producto
function agregarProducto(producto) {

    carrito.push(producto);

    totalProductos++;

    actualizarCarrito();

    mostrarResumen();
}

// Mostrar productos económicos usando FILTER
function mostrarProductosEconomicos() {

    const economicos = productos.filter(producto => {
        return producto.precio < 100;
    });

    let lista = "";

    economicos.forEach(producto => {
        lista += `• ${producto.nombre} - Q${producto.precio}<br>`;
    });

    Swal.fire({
        title: "Productos Económicos",
        html: lista,
        icon: "info"
    });
}

// ======================
// ARROW FUNCTION
// ======================
const validarCorreo = (correo) => {
    return correo.includes("@") &&
           correo.includes(".");
};

// ======================
// BOTONES COMPRAR
// ======================
botonesComprar.forEach((boton, index) => {

    boton.addEventListener("click", () => {

        try {

            const producto = productos[index];

            if (producto) {

                agregarProducto(producto);

            } else {

                throw new Error("Producto no encontrado");

            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });

        }

    });

});

// ======================
// VER CARRITO
// ======================
carritoTexto.addEventListener("click", () => {

    if (carrito.length === 0) {

        Swal.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "Aún no has agregado productos al carrito."
        });

        return;
    }

    let listaProductos = "";

    carrito.forEach((producto, index) => {
        listaProductos += `
            <p>
                <b>${index + 1}. ${producto.nombre}</b>
                - Q${producto.precio.toFixed(2)}
            </p>
        `;
    });

    calcularTotal();

    Swal.fire({
        title: "🛒 Mi carrito",
        html: `
            ${listaProductos}
            <hr>
            <p><b>Productos:</b> ${totalProductos}</p>
            <p><b>Subtotal:</b> Q${totalCompra.toFixed(2)}</p>
            <p><b>IVA:</b> Q${(totalCompra * IVA).toFixed(2)}</p>
            <p><b>Total a pagar:</b> Q${totalConIVA.toFixed(2)}</p>
        `,
        icon: "info",
        confirmButtonText: "Seguir comprando"
    });

});


// ======================
// FORMULARIO NEWSLETTER
// ======================
btnEnviar.addEventListener("click", (e) => {

    e.preventDefault();

    const correo = emailInput.value.trim();

    if (validarCorreo(correo)) {

        suscriptores.push(correo);

        Swal.fire({
            icon: "success",
            title: "Suscripción Exitosa",
            text: "Gracias por suscribirte"
        });

        emailInput.value = "";

    } else {

        Swal.fire({
            icon: "warning",
            title: "Correo Inválido",
            text: "Ingresa un correo válido"
        });

    }

});

// ======================
// BOTÓN COMPRAR AHORA
// ======================
const btnComprarAhora = document.getElementById("btnComprarAhora");

if (btnComprarAhora) {

    btnComprarAhora.addEventListener("click", () => {

        Swal.fire({
            title: "Bienvenido",
            text: "Explora nuestra colección para bebés",
            icon: "success"
        });

        document
            .getElementById("productos")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}

// ======================
// JQUERY
// ======================
$(document).ready(function () {

    // Animación principal
    $(".hero").hide().fadeIn(1500);

    // Productos
    $(".products").hide().slideDown(1500);

    // Hover tarjetas
    $(".card").hover(

        function () {

            $(this).animate({
                marginTop: "-10px"
            }, 200);

        },

        function () {

            $(this).animate({
                marginTop: "0px"
            }, 200);

        }

    );

    // Mensaje de bienvenida
    Swal.fire({
        title: "¡Bienvenido a EL GUAPO!",
        text: "Ropa de calidad para bebés",
        icon: "success",
        timer: 2500,
        showConfirmButton: false
    });

});
