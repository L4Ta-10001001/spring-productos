let idEditar = null;

function cargarProductos() {
  fetch('/api/productos')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('tabla-productos');
      tbody.innerHTML = '';
      data.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nombre}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" onclick="editarProducto(${p.id}, '${p.nombre}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function guardarProducto() {
  const nombre = document.getElementById('nombreProducto').value;

  if (!nombre.trim()) {
    mostrarAlerta('El nombre es obligatorio.', 'danger');
    return;
  }

  const producto = { nombre: nombre };

  if (idEditar) {
    fetch(`/api/productos/${idEditar}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    })
    .then(() => {
      mostrarAlerta('Producto actualizado correctamente.', 'success');
      idEditar = null;
      document.getElementById('nombreProducto').value = '';
      cargarProductos();
    });
  } else {
    fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    })
    .then(() => {
      mostrarAlerta('Producto guardado correctamente.', 'success');
      document.getElementById('nombreProducto').value = '';
      cargarProductos();
    });
  }
}

function editarProducto(id, nombre) {
  idEditar = id;
  document.getElementById('nombreProducto').value = nombre;
  mostrarAlerta(`Editando producto ID ${id}`, 'info');
}

function eliminarProducto(id) {
  if (!confirm('¿Está seguro de eliminar este producto?')) return;

  fetch(`/api/productos/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      mostrarAlerta('Producto eliminado correctamente.', 'success');
      cargarProductos();
    } else if (response.status === 409) {
      response.text().then(msg => mostrarAlerta(msg, 'danger'));
    } else {
      mostrarAlerta('Error inesperado al eliminar.', 'danger');
    }
  });
}

// Función reutilizable para mostrar alertas Bootstrap
function mostrarAlerta(msg, tipo = 'success') {
  const alerta = document.getElementById('alerta');
  alerta.className = `alert alert-${tipo}`;
  alerta.innerText = msg;
  alerta.classList.remove('d-none');
  setTimeout(() => alerta.classList.add('d-none'), 4000);
}

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', cargarProductos);
