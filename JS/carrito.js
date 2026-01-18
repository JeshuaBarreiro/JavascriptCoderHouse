const carritoItems = document.getElementById("carritoItems");
const totalCarrito = document.getElementById("totalCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

let carrito = [];

// AGREGAR AL CARRITO

function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(p => p.id === idProducto);

    if (!productoSeleccionado) return;

    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            cantidad: 1
        });
    }

    guardarCarrito();
    renderizarCarrito();
    notificarProductoAgregado(productoSeleccionado.nombre);
}

// RENDER CARRITO

function renderizarCarrito() {
    carritoItems.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");

        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toLocaleString()}</p>
            <input type="number" min="1" value="${producto.cantidad}" data-id="${producto.id}">
            <button class="eliminar" data-id="${producto.id}">❌</button>
        `;

        carritoItems.appendChild(div);
    });

    actualizarTotal();
    activarEventosCarrito();
}

// EVENTOS DEL CARRITO

function activarEventosCarrito() {
    const inputsCantidad = document.querySelectorAll("#carritoItems input");
    const botonesEliminar = document.querySelectorAll(".eliminar");

    inputsCantidad.forEach(input => {
        input.addEventListener("change", () => {
            const id = parseInt(input.dataset.id);
            const nuevaCantidad = parseInt(input.value);
            actualizarCantidad(id, nuevaCantidad);
        });
    });

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = parseInt(boton.dataset.id);
            eliminarProducto(id);
        });
    });
}
function devolverStock() {
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            producto.stock += item.cantidad;
        }
    });
}

// ACTUALIZAR CANTIDAD

function actualizarCantidad(id, nuevaCantidad) {
    const itemCarrito = carrito.find(p => p.id === id);
    const producto = productos.find(p => p.id === id);

    if (!itemCarrito || !producto) return;

    const cantidadAnterior = itemCarrito.cantidad;
    const diferencia = nuevaCantidad - cantidadAnterior;

    // SI SUMA CANTIDAD
    if (diferencia > 0) {
        if (producto.stock < diferencia) {
            Swal.fire({
                icon: "warning",
                title: "Stock insuficiente",
                text: "No hay suficiente stock disponible"
            });
            return;
        }
        producto.stock -= diferencia;
    }

    // SI RESTA CANTIDAD
    if (diferencia < 0) {
        producto.stock += Math.abs(diferencia);
    }

    itemCarrito.cantidad = nuevaCantidad;

    guardarCarrito();
    renderizarCarrito();
    renderizarProductos(productos);
}


// ELIMINAR PRODUCTO
function eliminarProducto(id) {
    const itemCarrito = carrito.find(p => p.id === id);
    const producto = productos.find(p => p.id === id);

    if (itemCarrito && producto) {
        // DEVOLVER TODO EL STOCK DE ESE PRODUCTO
        producto.stock += itemCarrito.cantidad;
    }

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito();
    renderizarCarrito();
    renderizarProductos(productos);
}


// ==========================
// TOTAL Y CONTADOR
// ==========================
function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

    totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
    contadorCarrito.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

// ==========================
// NOTIFICACIÓN
// ==========================
function notificarProductoAgregado(nombre) {
    Toastify({
        text: `${nombre} agregado al carrito`,
        duration: 2500,
        gravity: "bottom",
        position: "right"
    }).showToast();
}

// INICIALIZAR CARRITO

function iniciarCarrito() {
    const carritoGuardado = obtenerCarrito();

    if (carritoGuardado) {
        carrito = carritoGuardado;
        renderizarCarrito();
    }
}

iniciarCarrito();

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);

    if (!producto || producto.stock <= 0) {
        Swal.fire({
            icon: "warning",
            title: "Sin stock",
            text: "No hay más unidades disponibles"
        });
        return;
    }

    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // DESCONTAR STOCK
    producto.stock -= 1;

    guardarCarrito();
    renderizarCarrito();
    renderizarProductos(productos);
    notificarProductoAgregado(producto.nombre);
}
