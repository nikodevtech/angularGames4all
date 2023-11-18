import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotenedorJuegoComponent } from './cotenedor-juego/cotenedor-juego.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { DetalleJuegoComponent } from './detalle-juego/detalle-juego.component';

const routes: Routes = [
  { path: '', component: CotenedorJuegoComponent, children: [
    { path: 'listado', component: ListaJuegosComponent },
    { path: 'editar/:id', component: DetalleJuegoComponent },
    { path: 'crear', component: DetalleJuegoComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRoutingModule { }
