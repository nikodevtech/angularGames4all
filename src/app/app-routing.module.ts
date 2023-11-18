import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './Vistas/bienvenida/bienvenida.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent},
  { path: 'juegos', loadChildren: () => import('./Vistas/juego/juego.module').then(m => m.JuegoModule) },
  { path: 'usuarios', loadChildren: () => import('./Vistas/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'alquileres', loadChildren: () => import('./Vistas/alquiler/alquiler.module').then(m => m.AlquilerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
