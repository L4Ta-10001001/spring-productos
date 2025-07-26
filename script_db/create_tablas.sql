-- Crear la tabla proveedor
CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    nom_proveedor VARCHAR(50) NOT NULL
);

-- Crear la tabla producto
CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nom_producto VARCHAR(50) NOT NULL
);

-- Crear la tabla factura
CREATE TABLE factura (
    id_factura BIGSERIAL PRIMARY KEY,
    num_cedula VARCHAR(10) NOT NULL,
    nom_cliente VARCHAR(30) NOT NULL,
    nom_mes VARCHAR(20) NOT NULL,
    fecha_factura DATE NOT NULL,
    id_proveedor INT,
    id_producto INT,
    estado VARCHAR(15) NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proveedor) REFERENCES proveedor (id_proveedor),
    FOREIGN KEY (id_producto) REFERENCES producto (id_producto)
);

