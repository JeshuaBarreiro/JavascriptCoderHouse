const contenedorProductos = document.getElementById("productos");

let productos = [];

async function cargarProductos() {
    try {
        const response = await fetch("data/productos.json");
        productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los productos"
        });
    }
}

function renderizarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";

    listaProductos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <img src="assets/img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <button data-id="${producto.id}">Agregar al carrito</button>
        `;

        contenedorProductos.appendChild(card);
    });

    activarBotonesAgregar();
}

function activarBotonesAgregar() {
    const botones = document.querySelectorAll(".producto button");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.dataset.id);
            agregarAlCarrito(idProducto);
        });
    });
}

// AGREGO AL CARRO
function agregarAlCarrito(idProducto) {
}

cargarProductos();

function renderizarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";

    listaProductos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto");

        const sinStock = producto.stock === 0;

        card.innerHTML = `
            <img src="../img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <p class="stock ${sinStock ? "agotado" : ""}">
                ${sinStock ? "Sin stock" : `Stock: ${producto.stock}`}
            </p>
            <button data-id="${producto.id}" ${sinStock ? "disabled" : ""}>
                ${sinStock ? "No disponible" : "Agregar al carrito"}
            </button>
        `;

        contenedorProductos.appendChild(card);
    });

    activarBotonesAgregar();
}

