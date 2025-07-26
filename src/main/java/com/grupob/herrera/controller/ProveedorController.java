package com.grupob.herrera.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;

import com.grupob.herrera.model.Proveedor;
import com.grupob.herrera.service.ProveedorService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/proveedores")
@RequiredArgsConstructor
public class ProveedorController {

  private final ProveedorService proveedorService;

  @GetMapping
  public String listar(Model model) {
    model.addAttribute("proveedores", proveedorService.listarTodos());
    return "proveedores/listar";
  }

  @GetMapping("/nuevo")
  public String formularioNuevo(Model model) {
    model.addAttribute("proveedor", new Proveedor());
    return "proveedores/formulario";
  }

 /* @PostMapping("/guardar")
  public String guardar(@ModelAttribute Proveedor proveedor) {
    proveedorService.guardar(proveedor);
    return "redirect:/proveedores";
  }*/

  @PostMapping("/guardar")
  public String guardar(@Valid @ModelAttribute Proveedor proveedor, BindingResult result) {
    if (result.hasErrors()) {
      return "proveedores/formulario";
    }
    proveedorService.guardar(proveedor);
    return "redirect:/proveedores";
  }

  @GetMapping("/editar/{id}")
  public String editar(@PathVariable Integer id, Model model) {
    model.addAttribute("proveedor", proveedorService.obtenerPorId(id).orElseThrow());
    return "proveedores/formulario";
  }

  @GetMapping("/eliminar/{id}")
  public String eliminar(@PathVariable Integer id) {
    proveedorService.eliminarPorId(id);
    return "redirect:/proveedores";
  }
}
