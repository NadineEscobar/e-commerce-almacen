let currentItem = 8;
const productContainer = document.querySelector('.box-container');
const carrito = document.getElementById('carrito');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar los productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
    cargarEventsListeners();
});

// 1. Función para obtener productos desde el backend
function obtenerProductos() {
    fetch('http://localhost:5000/api/products') // Cambia el URL según tu configuración
        .then((response) => response.json())
        .then((data) => {
            renderizarProductos(data);
        })
        .catch((error) => console.error('Error al cargar productos:', error));
}

// 2. Renderizar productos en el DOM
function renderizarProductos(productos) {
    productos.forEach((producto) => {
        const productHTML = `
            <div class="box">
                <img src="${producto.image}" alt="${producto.name}">
                <div class="product-txt">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p class="precio">$${producto.price}</p>
                    <a href="#" class="agregar-carrito btn-3" data-id="${producto._id}">
                        Agregar al carrito
                    </a>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    // Mostrar solo los primeros 8 productos inicialmente
    let boxes = [...document.querySelectorAll('.box-container .box')];
    boxes.forEach((box, index) => {
        if (index >= currentItem) {
            box.style.display = 'none';
        }
    });
}

// 3. Mostrar más productos al hacer clic en el botón "Cargar más"
loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4 && i < boxes.length; i++) {
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
};

// 4. Funciones para manejar el carrito
function cargarEventsListeners() {
    productContainer.addEventListener('click', comprarElemento); // Evento para agregar al carrito
    carrito.addEventListener('click', eliminarElemento); // Evento para eliminar del carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); // Evento para vaciar el carrito
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id'),
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
          <img src="${elemento.imagen}" width="100" height="150">
       </td>
       <td>${elemento.titulo}</td>
       <td>${elemento.precio}</td>
       <td>
          <a href="#" class="borrar" data-id="${elemento.id}">X</a>
       </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
};