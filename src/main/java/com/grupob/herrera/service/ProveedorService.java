package com.grupob.herrera.service;

import com.grupob.herrera.model.Proveedor;
import com.grupob.herrera.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProveedorService {

  private final ProveedorRepository proveedorRepository;

  public List<Proveedor> listarTodos() {
    return proveedorRepository.findAll();
  }

  public Optional<Proveedor> obtenerPorId(Integer id) {
    return proveedorRepository.findById(id);
  }

  public Proveedor guardar(Proveedor proveedor) {
    return proveedorRepository.save(proveedor);
  }

  public void eliminarPorId(Integer id) {
    proveedorRepository.deleteById(id);
  }
}
