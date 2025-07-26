-- Insertar registros de inicio en proveedor
INSERT INTO proveedor (nom_proveedor) VALUES
('Microsoft'),
('Apple'),
('Samsung'),
('Google');

-- Insertar registros de inicio en producto
INSERT INTO producto (nom_producto) VALUES
('Windows 12'),
('Office 365'),
('iPhone 14'),
('Galaxy S21'),
('Google Pixel 6');

-- Insertar registros de inicio en factura
INSERT INTO factura (num_cedula, nom_cliente, nom_mes, fecha_factura, id_proveedor, id_producto, estado)
VALUES
('0102030405', 'Juan Pérez', 'Enero', '2025-01-15', 1, 1, 'Registrada'),
('0102030406', 'Ana Gómez', 'Febrero', '2025-02-20', 2, 2, 'Cancelada'),
('0102030407', 'Luis Rodríguez', 'Marzo', '2025-03-10', 3, 3, 'Registrada');

