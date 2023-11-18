import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ContenedorUsuarioComponent } from './contenedor-usuario/contenedor-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';


@NgModule({
  declarations: [
    ContenedorUsuarioComponent,
    ListaUsuariosComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
