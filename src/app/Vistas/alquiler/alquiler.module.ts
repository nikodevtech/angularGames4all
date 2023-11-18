import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlquilerRoutingModule } from './alquiler-routing.module';
import { ContenedorAlquilerComponent } from './contenedor-alquiler/contenedor-alquiler.component';
import { DetalleAlquilerComponent } from './detalle-alquiler/detalle-alquiler.component';
import { ListaAlquileresComponent } from './lista-alquileres/lista-alquileres.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContenedorAlquilerComponent,
    DetalleAlquilerComponent,
    ListaAlquileresComponent
  ],
  imports: [
    CommonModule,
    AlquilerRoutingModule,
    ReactiveFormsModule
  ]
})
export class AlquilerModule { }
