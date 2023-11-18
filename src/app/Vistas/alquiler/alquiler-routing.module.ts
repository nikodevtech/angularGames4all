import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorAlquilerComponent } from './contenedor-alquiler/contenedor-alquiler.component';
import { DetalleAlquilerComponent } from './detalle-alquiler/detalle-alquiler.component';
import { ListaAlquileresComponent } from './lista-alquileres/lista-alquileres.component';

const routes: Routes = [
  {path: '', component: ContenedorAlquilerComponent, children: [
    {path: 'listado', component: ListaAlquileresComponent},
    {path: 'editar/:id', component: DetalleAlquilerComponent},
    {path: 'crear', component: DetalleAlquilerComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlquilerRoutingModule { }
