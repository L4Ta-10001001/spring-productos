package com.grupob.herrera.controller;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupob.herrera.model.Proveedor;
import com.grupob.herrera.service.ProveedorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/proveedores")
@RequiredArgsConstructor
public class ProveedorRestController {

  private final ProveedorService proveedorService;

  @GetMapping
  public List<Proveedor> listarTodos() {
    return proveedorService.listarTodos();
  }

  @PostMapping
  public Proveedor guardar(@RequestBody Proveedor proveedor) {
    return proveedorService.guardar(proveedor);
  }

  @GetMapping("/{id}")
  public Proveedor obtenerPorId(@PathVariable Integer id) {
    return proveedorService.obtenerPorId(id).orElseThrow();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> eliminarPorId(@PathVariable Integer id) {
    try {
      proveedorService.eliminarPorId(id);
      return ResponseEntity.ok().build();
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(409).body("No se puede eliminar: este proveedor está asociado a facturas.");
    }
  }
}
