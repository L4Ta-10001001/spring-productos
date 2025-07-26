package com.grupob.herrera.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "facturas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Factura {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "cedula", length = 10, nullable = false)
  private String cedula;

  @Column(name = "cliente", length = 30, nullable = false)
  private String cliente;

  @Column(name = "mes", length = 20)
  private String mes;

  @Column(name = "fecha_factura", nullable = false)
  private LocalDate fechaFactura;

  @ManyToOne
  @JoinColumn(name = "proveedor_id", nullable = false)
  private Proveedor proveedor;

  @ManyToOne
  @JoinColumn(name = "producto_id", nullable = false)
  private Producto producto;

  @Column(name = "estado", length = 15)
  private String estado;

  @Column(name = "fecha_actualizacion")
  @Builder.Default
  private LocalDateTime fechaActualizacion = LocalDateTime.now();
}
