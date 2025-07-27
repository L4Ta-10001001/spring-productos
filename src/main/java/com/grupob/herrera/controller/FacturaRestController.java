package com.grupob.herrera.controller;

import com.grupob.herrera.model.Factura;
import com.grupob.herrera.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
