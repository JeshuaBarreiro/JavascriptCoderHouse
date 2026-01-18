const CLAVE_CARRITO = "carritoPCComponents";


// GUARDAR CARRITO

function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// OBTENER CARRITO

function obtenerCarrito() {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : null;
}


// LIMPIAR CARRITO

function limpiarCarrito() {
    localStorage.removeItem(CLAVE_CARRITO);
}
