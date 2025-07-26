package com.grupob.herrera.service;

import com.grupob.herrera.model.Factura;
import com.grupob.herrera.repository.FacturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FacturaService {

  private final FacturaRepository facturaRepository;

  public List<Factura> listarTodas() {
    return facturaRepository.findAll();
  }

  public Optional<Factura> obtenerPorId(Long id) {
    return facturaRepository.findById(id);
  }

  public Factura guardar(Factura factura) {
    return facturaRepository.save(factura);
  }

  public void eliminarPorId(Long id) {
    facturaRepository.deleteById(id);
  }

  public List<Factura> buscarPorProveedorYProducto(Integer proveedorId, Integer productoId) {
    return facturaRepository.findByProveedorIdAndProductoId(proveedorId, productoId);
  }
}
