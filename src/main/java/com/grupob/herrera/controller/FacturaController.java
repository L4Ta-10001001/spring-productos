package com.grupob.herrera.controller;

import com.grupob.herrera.model.Factura;
import com.grupob.herrera.service.FacturaService;
import com.grupob.herrera.service.ProductoService;
import com.grupob.herrera.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/facturas")
@RequiredArgsConstructor
public class FacturaController {

  private final FacturaService facturaService;
  private final ProveedorService proveedorService;
  private final ProductoService productoService;

  @GetMapping
  public String listar(Model model) {
    model.addAttribute("facturas", facturaService.listarTodas());
    return "facturas/listar";
  }

  @GetMapping("/nueva")
  public String formularioNuevo(Model model) {
    model.addAttribute("factura", new Factura());
    model.addAttribute("proveedores", proveedorService.listarTodos());
    model.addAttribute("productos", productoService.listarTodos());
    return "facturas/formulario";
  }

  @PostMapping("/guardar")
  public String guardar(@ModelAttribute Factura factura) {
    facturaService.guardar(factura);
    return "redirect:/facturas";
  }

  @GetMapping("/editar/{id}")
  public String editar(@PathVariable Long id, Model model) {
    model.addAttribute("factura", facturaService.obtenerPorId(id).orElseThrow());
    model.addAttribute("proveedores", proveedorService.listarTodos());
    model.addAttribute("productos", productoService.listarTodos());
    return "facturas/formulario";
  }

  @GetMapping("/eliminar/{id}")
  public String eliminar(@PathVariable Long id) {
    facturaService.eliminarPorId(id);
    return "redirect:/facturas";
  }

  @GetMapping("/reporte")
  public String reporte(@RequestParam Integer proveedorId, @RequestParam Integer productoId, Model model) {
    model.addAttribute("facturas", facturaService.buscarPorProveedorYProducto(proveedorId, productoId));
    return "facturas/reporte";
  }
}
