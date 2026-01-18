const btnCarrito = document.getElementById("btnCarrito");
const carritoModal = document.getElementById("carritoModal");
const btnCerrar = document.getElementById("btnCerrar");
const btnVaciar = document.getElementById("btnVaciar");
const btnComprar = document.getElementById("btnComprar");


// ABRIR Y CERRAR CARRITO

btnCarrito.addEventListener("click", () => {
    carritoModal.classList.remove("oculto");
});

btnCerrar.addEventListener("click", () => {
    carritoModal.classList.add("oculto");
});


// VACIAR CARRITO

btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) return;

    Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se devolverá el stock de los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            devolverStock();
            carrito = [];
            limpiarCarrito();
            renderizarCarrito();
            renderizarProductos(productos);

            Swal.fire({
                icon: "success",
                title: "Carrito vacío",
                text: "El stock fue restaurado"
            });
        }
    });
});

// FINALIZAR COMPRA

btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "Agregá productos antes de comprar"
        });
        return;
    }

    Swal.fire({
        title: "¿Confirmar compra?",
        text: "Esta acción simula el proceso de pago",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            limpiarCarrito();
            renderizarCarrito();
            carritoModal.classList.add("oculto");

            Swal.fire({
                icon: "success",
                title: "Compra realizada",
                text: "Gracias por tu compra"
            });
        }
    });
});

carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto) producto.stock += item.cantidad;
});

function eliminarProducto(id) {
    const productoEnCarrito = carrito.find(p => p.id === id);
    const producto = productos.find(p => p.id === id);

    if (productoEnCarrito && producto) {
        producto.stock += productoEnCarrito.cantidad;
    }

    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    renderizarCarrito();
    renderizarProductos(productos);
}

