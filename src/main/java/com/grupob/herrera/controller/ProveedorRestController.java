package com.grupob.herrera.controller;

import com.grupob.herrera.model.Proveedor;
import com.grupob.herrera.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
  public void eliminarPorId(@PathVariable Integer id) {
    proveedorService.eliminarPorId(id);
  }

}

