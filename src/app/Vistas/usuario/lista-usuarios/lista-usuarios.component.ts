import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modelo/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  
  listaUsuarios: Usuario[] = [];

  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  //element.payload.doc.id --> accede al id que tiene cada documento (registro) en firebase
  //element.payload.doc.data -->  accede a la data (campos) del documento

  /**
   * Obtiene todos los juegos de firebase con el servicio
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
   * Elimina un juego llamando al servicio
   * @param id del juego a eliminar
   */
  eliminarUsuario(id: string) {
    this._firebaseService
      .eliminar('usuarios',id)
      .then(() => {
        console.log('Usuario eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Método para mostrar un Alert con la libreria sweetalert para confirmar acciones
   * @param id id del juego a borrar
   */
  confirmarAccion(id: string, dni: string) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el usuario con DNI ${dni}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#18BE79',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Se elimina empleado si se confirma la acción
        this.eliminarUsuario(id);
        Swal.fire(
          '¡Acción completada!',
          'Usuario eliminado con éxito.',
          'success'
        );
      }
    });
  }
}
