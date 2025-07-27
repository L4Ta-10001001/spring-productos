let idEditarProveedor = null;

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
            <button class="btn btn-warning btn-sm me-2" onclick="editarProveedor(${p.id}, '${p.nombre}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarProveedor(${p.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function guardarProveedor() {
  const nombre = document.getElementById("nombreProveedor").value;

  if (!nombre.trim()) {
    mostrarAlerta("El nombre es obligatorio.", "danger");
    return;
  }

  const proveedor = { nombre: nombre };

  if (idEditarProveedor) {
    fetch(`/api/proveedores/${idEditarProveedor}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proveedor),
    }).then(() => {
      mostrarAlerta("Proveedor actualizado correctamente.", "success");
      idEditarProveedor = null;
      document.getElementById("nombreProveedor").value = "";
      cargarProveedores();
    });
  } else {
    fetch("/api/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proveedor),
    }).then(() => {
      mostrarAlerta("Proveedor guardado correctamente.", "success");
      document.getElementById("nombreProveedor").value = "";
      cargarProveedores();
    });
  }
}

function editarProveedor(id, nombre) {
  idEditarProveedor = id;
  document.getElementById("nombreProveedor").value = nombre;
  mostrarAlerta(`Editando proveedor ID ${id}`, "info");
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

function mostrarAlerta(msg, tipo = "success") {
  const alerta = document.getElementById("alerta");
  alerta.className = `alert alert-${tipo}`;
  alerta.innerText = msg;
  alerta.classList.remove("d-none");
  setTimeout(() => alerta.classList.add("d-none"), 4000);
}

document.addEventListener("DOMContentLoaded", cargarProveedores);
