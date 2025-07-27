package com.grupob.herrera.controller;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupob.herrera.model.Producto;
import com.grupob.herrera.service.ProductoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoRestController {

  private final ProductoService productoService;

  @GetMapping
  public List<Producto> listarTodos() {
    return productoService.listarTodos();
  }

  @PostMapping
  public Producto guardar(@RequestBody Producto producto) {
    return productoService.guardar(producto);
  }

  @GetMapping("/{id}")
  public Producto obtenerPorId(@PathVariable Integer id) {
    return productoService.obtenerPorId(id).orElseThrow();
  }

  @PutMapping("/{id}")
  public Producto actualizar(@PathVariable Integer id, @RequestBody Producto producto) {
    Producto existente = productoService.obtenerPorId(id).orElseThrow();
    producto.setId(id);
    return productoService.guardar(producto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> eliminarPorId(@PathVariable Integer id) {
    try {
      productoService.eliminarPorId(id);
      return ResponseEntity.ok().build();
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(409).body("No se puede eliminar: este producto está asociado a facturas.");
    }
  }
}
