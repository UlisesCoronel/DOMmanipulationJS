const template = document.querySelector("#template__li");
const carrito = document.querySelector("#carrito");
const buttons = document.querySelectorAll(".container__frutas-btn");
const fragment = document.createDocumentFragment();

const carritoObjeto = {};
// Creo el objeto que va a contener mis productos

const agregarAlCarrito = (e) => {
  //función para agregar al carrito de compras
  // console.log(e.target.dataset.fruta)

  const producto = {
    nombre: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
  };

  if (carritoObjeto.hasOwnProperty(producto.id)) {
    producto.cantidad = carritoObjeto[producto.nombre].cantidad + 1;
  }

  carritoObjeto[producto.nombre] = producto;
  // guardo el objeto 'producto' como objeto anidado de 'carritoObjeto.
  // el nombre es 'producto.nombre'

  pintarCarrito();
};

buttons.forEach((btn) => btn.addEventListener("click", agregarAlCarrito));
// recorre los botones y 'escucha' el evento click, luego ejecuta 'agregarAlCarrito'

const pintarCarrito = () => {
  carrito.textContent = "";

  Object.values(carritoObjeto).forEach((item) => {
    const clone = template.content.firstElementChild.cloneNode(true);
    //evita errores al usar templates

    clone.querySelector(".carrito__nombre").textContent = item.nombre;
    clone.querySelector(".carrito__cantidad").textContent = item.cantidad;
    //cambia el contenido de los <span> en el html

    fragment.appendChild(clone);
    //agrega las modificaciones al clon, una vez por cada objeto dentro de carritoObjeto
  });

  carrito.style.display = "block";
  carrito.appendChild(fragment);
  //agrega todo al DOM
};
