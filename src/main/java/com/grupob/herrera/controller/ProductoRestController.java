package com.grupob.herrera.controller;

import com.grupob.herrera.model.Producto;
import com.grupob.herrera.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @DeleteMapping("/{id}")
  public void eliminarPorId(@PathVariable Integer id) {
    productoService.eliminarPorId(id);
  }

}

