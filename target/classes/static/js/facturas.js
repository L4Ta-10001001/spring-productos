let idEditarFactura = null;

function cargarFacturas() {
  fetch("/api/facturas")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tabla-facturas");
      tbody.innerHTML = "";
      data.forEach((f) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${f.id}</td>
          <td>${f.cedula}</td>
          <td>${f.cliente}</td>
          <td>${f.mes}</td>
          <td>${f.fechaFactura}</td>
          <td>${f.proveedor ? f.proveedor.nombre : ""}</td>
          <td>${f.producto ? f.producto.nombre : ""}</td>
          <td>${f.estado}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" onclick="editarFactura(${f.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarFactura(${f.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function cargarProveedoresSelect(id) {
  fetch("/api/proveedores")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById(id);
      select.innerHTML = "";
      data.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.id;
        option.text = p.nombre;
        select.appendChild(option);
      });
    });
}

function cargarProductosSelect(id) {
  fetch("/api/productos")
    .then((response) => response.json())
    .then((data) => {
      const select = document.getElementById(id);
      select.innerHTML = "";
      data.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.id;
        option.text = p.nombre;
        select.appendChild(option);
      });
    });
}

function guardarFactura() {
  const cedula = document.getElementById("cedula").value;
  const cliente = document.getElementById("cliente").value;
  const mes = document.getElementById("mes").value;
  const fechaFactura = document.getElementById("fechaFactura").value;
  const proveedorId = document.getElementById("selectProveedor").value;
  const productoId = document.getElementById("selectProducto").value;
  const estado = document.getElementById("estado").value;

  if (!cedula || !cliente || !mes || !fechaFactura || !estado) {
    mostrarAlerta("Todos los campos son obligatorios.", "danger");
    return;
  }

  const factura = {
    cedula: cedula,
    cliente: cliente,
    mes: mes,
    fechaFactura: fechaFactura,
    estado: estado,
    proveedor: { id: proveedorId },
    producto: { id: productoId },
  };

  if (idEditarFactura) {
    fetch(`/api/facturas/${idEditarFactura}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(factura),
    }).then(() => {
      mostrarAlerta("Factura actualizada correctamente.", "success");
      idEditarFactura = null;
      limpiarFormularioFactura();
      cargarFacturas();
    });
  } else {
    fetch("/api/facturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(factura),
    }).then(() => {
      mostrarAlerta("Factura guardada correctamente.", "success");
      limpiarFormularioFactura();
      cargarFacturas();
    });
  }
}

function editarFactura(id) {
  fetch(`/api/facturas/${id}`)
    .then((response) => response.json())
    .then((f) => {
      idEditarFactura = f.id;
      document.getElementById("cedula").value = f.cedula;
      document.getElementById("cliente").value = f.cliente;
      document.getElementById("mes").value = f.mes;
      document.getElementById("fechaFactura").value = f.fechaFactura;
      document.getElementById("selectProveedor").value = f.proveedor.id;
      document.getElementById("selectProducto").value = f.producto.id;
      document.getElementById("estado").value = f.estado;

      mostrarAlerta(`Editando factura ID ${id}`, "info");
    });
}

function eliminarFactura(id) {
  if (!confirm("¿Está seguro de eliminar esta factura?")) return;

  fetch(`/api/facturas/${id}`, {
    method: "DELETE",
  }).then(() => {
    mostrarAlerta("Factura eliminada.", "success");
    cargarFacturas();
  });
}

function buscarFacturas() {
  const proveedorId = document.getElementById("buscarProveedor").value;
  const productoId = document.getElementById("buscarProducto").value;

  fetch(
    `/api/facturas/buscar?proveedorId=${proveedorId}&productoId=${productoId}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("tabla-facturas");
      tbody.innerHTML = "";
      data.forEach((f) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${f.id}</td>
          <td>${f.cedula}</td>
          <td>${f.cliente}</td>
          <td>${f.mes}</td>
          <td>${f.fechaFactura}</td>
          <td>${f.proveedor ? f.proveedor.nombre : ""}</td>
          <td>${f.producto ? f.producto.nombre : ""}</td>
          <td>${f.estado}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" onclick="editarFactura(${f.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarFactura(${f.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

function limpiarFormularioFactura() {
  document.getElementById("cedula").value = "";
  document.getElementById("cliente").value = "";
  document.getElementById("mes").value = "";
  document.getElementById("fechaFactura").value = "";
  document.getElementById("selectProveedor").value = "";
  document.getElementById("selectProducto").value = "";
  document.getElementById("estado").value = "";
}

function mostrarAlerta(msg, tipo = "success") {
  const alerta = document.getElementById("alerta");
  alerta.className = `alert alert-${tipo}`;
  alerta.innerText = msg;
  alerta.classList.remove("d-none");
  setTimeout(() => alerta.classList.add("d-none"), 4000);
}

// Inicializar combos y facturas al cargar la página
window.onload = () => {
  cargarProveedoresSelect("selectProveedor");
  cargarProductosSelect("selectProducto");
  cargarProveedoresSelect("buscarProveedor");
  cargarProductosSelect("buscarProducto");
  cargarFacturas();
};
