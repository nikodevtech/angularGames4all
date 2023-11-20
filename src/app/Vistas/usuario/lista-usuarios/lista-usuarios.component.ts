import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modelo/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  
  listaUsuarios: Usuario[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  //element.payload.doc.id --> accede al id que tiene cada documento (registro) en firebase
  //element.payload.doc.data -->  accede a la data (campos) del documento

  /**
   * Obtiene todos los juegos registrados en firebase con dicho servicio
   * @returns suscripcion al observable
   */
  getUsuarios() {
    return this._firebaseService.obtenerTodos('usuarios').subscribe((data) => {
      this.listaUsuarios = [];
      data.forEach((element: any) => {
        //iteramos sobre los datos del observable
        this.listaUsuarios.push({
          id: element.payload.doc.id, // asignamos el id del registro
          ...element.payload.doc.data(), // asignamos el resto de los atributos/campos con spread operator
        });
      });
    });
  }

  /**
   * Elimina un juego llamando al servicio para confirmar la eliminación
   * @param id del juego a eliminar
   */
  eliminarUsuario(id: string, dni: string) {
    this._notificacionesService.confirmarEliminar(id, dni, 'usuario', 'usuarios');
  }

}
