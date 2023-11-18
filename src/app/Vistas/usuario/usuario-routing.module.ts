import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorUsuarioComponent } from './contenedor-usuario/contenedor-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';

const routes: Routes = [
  { path: '', component: ContenedorUsuarioComponent, children: [
    { path: 'listado', component: ListaUsuariosComponent },
    { path: 'editar/:id', component: DetalleUsuarioComponent },
    { path: 'crear', component: DetalleUsuarioComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
