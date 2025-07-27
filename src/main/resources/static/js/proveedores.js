function cargarProveedores() {
  fetch("/api/proveedores")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tabla-proveedores");
      tbody.innerHTML = "";
      data.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>
            <button onclick="eliminarProveedor(${p.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function guardarProveedor() {
  const nombre = document.getElementById("nombreProveedor").value;

  if (!nombre.trim()) {
    alert("El nombre es obligatorio.");
    return;
  }

  fetch("/api/proveedores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombre }),
  }).then(() => {
    alert("Proveedor guardado.");
    document.getElementById("nombreProveedor").value = "";
    cargarProveedores();
  });
}

function eliminarProveedor(id) {
  if (!confirm('¿Está seguro de eliminar este proveedor?')) return;

  fetch(`/api/proveedores/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      mostrarAlerta('Proveedor eliminado correctamente.', 'success');
      cargarProveedores();
    } else if (response.status === 409) {
      response.text().then(msg => mostrarAlerta(msg, 'danger'));
    } else {
      mostrarAlerta('Error inesperado al eliminar.', 'danger');
    }
  });
}
