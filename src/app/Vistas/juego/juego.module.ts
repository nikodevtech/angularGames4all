import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoRoutingModule } from './juego-routing.module';
import { DetalleJuegoComponent } from './detalle-juego/detalle-juego.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { CotenedorJuegoComponent } from './cotenedor-juego/cotenedor-juego.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetalleJuegoComponent,
    ListaJuegosComponent,
    CotenedorJuegoComponent
  ],
  imports: [
    CommonModule,
    JuegoRoutingModule,
    ReactiveFormsModule 
  ]
})
export class JuegoModule { }
