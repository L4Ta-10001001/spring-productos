package com.grupob.herrera.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupob.herrera.model.Factura;
import com.grupob.herrera.service.FacturaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/facturas")
@RequiredArgsConstructor
public class FacturaRestController {

  private final FacturaService facturaService;

  @GetMapping
  public List<Factura> listarTodas() {
    return facturaService.listarTodas();
  }

  @PostMapping
  public Factura guardar(@RequestBody Factura factura) {
    return facturaService.guardar(factura);
  }

  @GetMapping("/{id}")
  public Factura obtenerPorId(@PathVariable Long id) {
    return facturaService.obtenerPorId(id).orElseThrow();
  }

  @PutMapping("/{id}")
  public Factura actualizar(@PathVariable Long id, @RequestBody Factura factura) {
    Factura existente = facturaService.obtenerPorId(id).orElseThrow();
    factura.setId(id);
    return facturaService.guardar(factura);
  }

  @DeleteMapping("/{id}")
  public void eliminarPorId(@PathVariable Long id) {
    facturaService.eliminarPorId(id);
  }

  @GetMapping("/buscar")
  public List<Factura> buscarPorProveedorYProducto(
      @RequestParam Integer proveedorId,
      @RequestParam Integer productoId) {
    return facturaService.buscarPorProveedorYProducto(proveedorId, productoId);
  }

}
