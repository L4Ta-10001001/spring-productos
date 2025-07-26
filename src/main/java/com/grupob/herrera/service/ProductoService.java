package com.grupob.herrera.service;

import com.grupob.herrera.model.Producto;
import com.grupob.herrera.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductoService {

  private final ProductoRepository productoRepository;

  public List<Producto> listarTodos() {
    return productoRepository.findAll();
  }

  public Optional<Producto> obtenerPorId(Integer id) {
    return productoRepository.findById(id);
  }

  public Producto guardar(Producto producto) {
    return productoRepository.save(producto);
  }

  public void eliminarPorId(Integer id) {
    productoRepository.deleteById(id);
  }
}
