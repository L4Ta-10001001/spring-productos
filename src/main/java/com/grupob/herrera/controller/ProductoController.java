package com.grupob.herrera.controller;

import com.grupob.herrera.model.Producto;
import com.grupob.herrera.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/productos")
@RequiredArgsConstructor
public class ProductoController {

  private final ProductoService productoService;

  @GetMapping
  public String listar(Model model) {
    model.addAttribute("productos", productoService.listarTodos());
    return "productos/listar";
  }

  @GetMapping("/nuevo")
  public String formularioNuevo(Model model) {
    model.addAttribute("producto", new Producto());
    return "productos/formulario";
  }

  @PostMapping("/guardar")
  public String guardar(@ModelAttribute Producto producto) {
    productoService.guardar(producto);
    return "redirect:/productos";
  }

  @GetMapping("/editar/{id}")
  public String editar(@PathVariable Integer id, Model model) {
    model.addAttribute("producto", productoService.obtenerPorId(id).orElseThrow());
    return "productos/formulario";
  }

  @GetMapping("/eliminar/{id}")
  public String eliminar(@PathVariable Integer id) {
    productoService.eliminarPorId(id);
    return "redirect:/productos";
  }
}
