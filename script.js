const ITEMS_POR_PAGINA = 20;
let productos = [];
let paginaActual = 1;

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarPagina(1);
  });

function mostrarPagina(pagina) {
  paginaActual = pagina;
  const contenedor = document.getElementById("lista");
  contenedor.innerHTML = "";

  const inicio = (pagina - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const productosPagina = productos.slice(inicio, fin);

  productosPagina.forEach(p => {
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio.toFixed(2)}</p>
      </div>
    `;
  });

  actualizarPaginacion();
}

function actualizarPaginacion() {
  const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === paginaActual) btn.classList.add("active");
    btn.addEventListener("click", () => mostrarPagina(i));
    paginacion.appendChild(btn);
  }
}
