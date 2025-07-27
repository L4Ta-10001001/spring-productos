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
            <button onclick="eliminarFactura(${f.id})">Eliminar</button>
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
    alert("Todos los campos son obligatorios.");
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

  fetch("/api/facturas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(factura),
  }).then(() => {
    alert("Factura guardada.");
    cargarFacturas();
  });
}

function eliminarFactura(id) {
  if (!confirm("¿Está seguro de eliminar esta factura?")) return;

  fetch(`/api/facturas/${id}`, {
    method: "DELETE",
  }).then(() => {
    alert("Factura eliminada.");
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
            <button onclick="eliminarFactura(${f.id})">Eliminar</button>
          </td>`;
        tbody.appendChild(row);
      });
    });
}

// Inicializar combos cuando se cargue la página de facturas
window.onload = () => {
  cargarProveedoresSelect("selectProveedor");
  cargarProductosSelect("selectProducto");
  cargarProveedoresSelect("buscarProveedor");
  cargarProductosSelect("buscarProducto");
};
