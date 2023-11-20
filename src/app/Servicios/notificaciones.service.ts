import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { FirebaseService } from './firebase.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {

  constructor(
    private _firebaseService: FirebaseService,
    private toastr: ToastrService, //Dependencia para alerts con estilo
  ) {}

  notificacionRegistrar(elementoAnotificar: string) {
    this.toastr.success(
      `El ${elementoAnotificar} fue registrado con exito`,
      `${elementoAnotificar} Registrado`
    );
  }

  notificacionModificar(elementoAnotificar: string) {
    this.toastr.info(
      `El ${elementoAnotificar} fue actualizado con exito`,
      `${elementoAnotificar} Actualizado`
    );
  }

  /**
   * Método para eliminar un elemento de firebase y confirmar con un Alert que 
   * estas seguro de eliminar dicho elemento
   * @param nombre del juego
   * @param elementoEliminar nombre del elemento a eliminar
   * @param coleccion nombre de la coleccion donde se encuentra
   */
  confirmarEliminar(id: string, nombre: string,elementoEliminar: string, coleccion: string) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el ${elementoEliminar} ${nombre}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#18BE79',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._firebaseService
          .eliminar(coleccion, id)
          .then(() => {
            console.log(`${elementoEliminar} eliminado`);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire(
          '¡Acción completada!',
          `${elementoEliminar} eliminado con exito.`,
          'success'
        );
      }
    });
  }

}
