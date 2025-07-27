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

  fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre: nombre })
  })
  .then(() => {
    mostrarAlerta('Producto guardado correctamente.', 'success');
    document.getElementById('nombreProducto').value = '';
    cargarProductos();
  });
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
