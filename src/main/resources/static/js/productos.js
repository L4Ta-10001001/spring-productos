function cargarProductos() {
  fetch("/api/productos")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tabla-productos");
      tbody.innerHTML = "";
      data.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>
            <button onclick="eliminarProducto(${p.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function guardarProducto() {
  const nombre = document.getElementById("nombreProducto").value;

  if (!nombre.trim()) {
    alert("El nombre es obligatorio.");
    return;
  }

  fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombre }),
  }).then(() => {
    alert("Producto guardado.");
    document.getElementById("nombreProducto").value = "";
    cargarProductos();
  });
}

function eliminarProducto(id) {
  if (!confirm("¿Está seguro de eliminar este producto?")) return;

  fetch(`/api/productos/${id}`, {
    method: "DELETE",
  }).then(() => {
    alert("Producto eliminado.");
    cargarProductos();
  });
}
