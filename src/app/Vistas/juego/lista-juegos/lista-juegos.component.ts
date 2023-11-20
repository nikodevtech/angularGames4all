import { Component } from '@angular/core';
import { Juego } from 'src/app/Modelo/juego';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent {
  listaJuegos: Juego[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private _notificacionesService: NotificacionesService
  ) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  //element.payload.doc.id --> accede al id que tiene cada documento (registro) en firebase
  //element.payload.doc.data -->  accede a la data (campos) del documento

  /**
   * Obtiene todos los juegos registrados en firebase con dicho servicio
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
   * Elimina un juego llamando al servicio de confimación
   * @param id del juego a eliminar
   * @param nombre del juego para mostrarlo en la notificación
   */
  eliminarJuego(id: string, nombre: string) {
    this._notificacionesService.confirmarEliminar(id, nombre, 'juego', 'juegos');
  }


}
