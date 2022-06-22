const template = document.querySelector("#template__li");
const carrito = document.querySelector("#carrito");
const fragment = document.createDocumentFragment();
const templateTotal = document.querySelector(".templateTotal");
const carritoTotal = document.querySelector(".carrito__total-container");

let carritoObjeto = [];
// Creo el arreglo que va a contener mis productos

const agregarAlCarrito = (e) => {
  //función para agregar al carrito de compras
  // console.log(e.target.dataset.fruta)

  const producto = {
    nombre: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const indice = carritoObjeto.findIndex((item) => item.id === producto.id);

  // compruebo si me objeto ya se encuentra en el array
  if (indice === -1) {
    // agrego al array en caso de que no exista
    carritoObjeto.push(producto);
  } else {
    // modifico valor en caso de que exista
    carritoObjeto[indice].cantidad++;
    carritoObjeto[indice].precio = producto.precio;
  }

  // console.log(carritoObjeto);

  pintarCarrito();
};

const pintarCarrito = () => {
  carrito.textContent = "";

  carritoObjeto.forEach((item) => {
    const clone = template.content.cloneNode(true);
    //evita errores al usar templates

    clone.querySelector(".carrito__nombre").textContent = item.nombre;
    clone.querySelector(".carrito__cantidad").textContent = item.cantidad;
    clone.querySelector(".carrito__subtotal-unitario").textContent =
      item.precio * item.cantidad;
    //cambia el contenido de los <span> en el html

    clone.querySelector(".carrito__boton-agregar").dataset.id = item.id;
    clone.querySelector(".carrito__boton-quitar").dataset.id = item.id;
    fragment.appendChild(clone);
    //agrega las modificaciones al clon, una vez por cada objeto dentro de carritoObjeto
  });

  carrito.style.display = "block";
  carrito.appendChild(fragment);
  //agrega todo al DOM
  pintarFooter();
};

pintarFooter = () => {
  carritoTotal.textContent = "";

  const total = carritoObjeto.reduce(
    (acc, current) => acc + current.cantidad * current.precio, 0
  )
  
  const clone = templateTotal.content.cloneNode(true);
  clone.querySelector(".carrito__total-precio").textContent = total;
  carritoTotal.style.display = "block";
  carritoTotal.appendChild(clone)
}

const btnAgregar = (e) => {
  carritoObjeto = carritoObjeto.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  pintarCarrito();
};

const btnQuitar = (e) => {
  carritoObjeto = carritoObjeto.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
      }
    }
    return item;
  });
  if (carritoObjeto.length === 0){
    carrito.style.display = "none";
    carritoTotal.style.display = "none";
  } else {
    pintarCarrito()
  }  
};

document.addEventListener("click", (e) => {
  // captura los botones de agregar al carrito
  if (e.target.matches(".container__frutas-btn")) {
    agregarAlCarrito(e);
  }

  if (e.target.matches(".carrito__boton-agregar")) {
    btnAgregar(e);
  }

  if (e.target.matches(".carrito__boton-quitar")) {
    btnQuitar(e);
  }
});
