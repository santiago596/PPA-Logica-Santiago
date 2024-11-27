 // Array para almacenar los productos en el carrito
 let carrito = [];

 // Función para agregar un producto al carrito
 function agregarAlCarrito(id, nombre, precio, imagen) {
     // Verificamos si el producto ya está en el carrito
     const productoExistente = carrito.find(producto => producto.id === id);
     
     if (productoExistente) {
         // Si el producto ya existe, solo aumentamos la cantidad
         productoExistente.cantidad++;
     } else {
         // Si no existe, lo agregamos al carrito con cantidad 1
         carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
     }
     
     // Actualizamos el carrito en la vista
     actualizarCarrito();
 }

 // Función para actualizar la vista del carrito
 function actualizarCarrito() {
     const listaCarrito = document.querySelector("#lista-carrito tbody");
     const totalCarrito = document.querySelector("#total-carrito");
     listaCarrito.innerHTML = '';  // Limpiamos el contenido de la tabla

     let total = 0;

     // Recorremos el carrito y mostramos los productos
     carrito.forEach(producto => {
         const fila = document.createElement("tr");
         fila.innerHTML = `
             <td><img src="${producto.imagen}" alt="Producto" width="50"></td>
             <td>${producto.nombre}</td>
             <td>$${producto.precio}</td>
             <td>${producto.cantidad}</td>
         `;
         listaCarrito.appendChild(fila);

         // Sumamos el total
         total += producto.precio * producto.cantidad;
     });

     // Actualizamos el total
     totalCarrito.innerText = `Total: $${total.toFixed(2)}`;
 }

 // Función para mostrar u ocultar el carrito
 function toggleCarrito() {
     const carritoDiv = document.querySelector("#carrito");
     carritoDiv.classList.toggle('mostrar');
 }

 // Eventos para los botones "Agregar al carrito"
 const botonesAgregar = document.querySelectorAll(".agregar-carrito");
 botonesAgregar.forEach(boton => {
     boton.addEventListener("click", function(event) {
         event.preventDefault();
         const id = boton.getAttribute("data-id");
         const nombre = boton.parentElement.querySelector("h3").innerText;
         const precio = parseFloat(boton.parentElement.querySelector(".ajust-precio").innerText.replace('$', '').replace('.', '').replace(',', '.'));
         const imagen = boton.parentElement.querySelector("img").src;

         // Agregamos el producto al carrito
         agregarAlCarrito(id, nombre, precio, imagen);
     });
 });

 // Evento para abrir/cerrar el carrito al hacer clic en el ícono del carrito
 const iconoCarrito = document.querySelector("#img-carrito");
 iconoCarrito.addEventListener("click", toggleCarrito);

 // Evento para vaciar el carrito
 const vaciarCarrito = document.querySelector("#vaciar-carrito");
 vaciarCarrito.addEventListener("click", function() {
     carrito = [];
     actualizarCarrito();
 });


/*CARRUSEL*/

const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {

    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff);

    if (carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {

    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);