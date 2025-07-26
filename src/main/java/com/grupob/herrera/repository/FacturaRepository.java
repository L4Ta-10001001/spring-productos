package com.grupob.herrera.repository;

import com.grupob.herrera.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {

  List<Factura> findByProveedorIdAndProductoId(Integer proveedorId, Integer productoId);
}
