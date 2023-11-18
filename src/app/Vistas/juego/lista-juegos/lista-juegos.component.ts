import { Component } from '@angular/core';
import { Juego } from 'src/app/Modelo/juego';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent {
  listaJuegos: Juego[] = [];

  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  //element.payload.doc.id --> accede al id que tiene cada documento (registro) en firebase
  //element.payload.doc.data -->  accede a la data (campos) del documento

  /**
   * Obtiene todos los juegos de firebase con el servicio
   * @returns suscripcion al observable
   */
  getJuegos() {
    return this._firebaseService.obtenerTodos('juegos').subscribe((data) => {
      console.log(data);
      this.listaJuegos = [];
      data.forEach((element: any) => {
        //iteramos sobre los datos del observable
        this.listaJuegos.push({
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
  eliminarJuego(id: string) {
    this._firebaseService
      .eliminar('juegos',id)
      .then(() => {
        console.log('juego eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Método para mostrar un Alert con la libreria sweetalert para confirmar acciones
   * @param id id del juego a borrar
   */
  confirmarAccion(id: string, nombre: string) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el juego ${nombre}?`,
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
        this.eliminarJuego(id);
        Swal.fire(
          '¡Acción completada!',
          'Juego eliminado con éxito.',
          'success'
        );
      }
    });
  }
}
