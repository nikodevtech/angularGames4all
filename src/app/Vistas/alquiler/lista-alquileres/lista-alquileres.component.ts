import { Component } from '@angular/core';
import { Alquiler } from 'src/app/Modelo/alquiler';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css'],
})
export class ListaAlquileresComponent {

  listaAlquileres: Alquiler[] = []; 

  constructor(
    private _firebaseService: FirebaseService,
    private _notificacionesService: NotificacionesService
  ) {}

  ngOnInit() {
    this.getAlquileres();
  }

  /**
   * Obtiene todos los alquileres registrados en firebase con dicho servicio
   * @returns suscripcion al observable
   */
  getAlquileres() {
    return this._firebaseService.obtenerTodos('alquileres').subscribe((data) => {
      this.listaAlquileres = [];
      data.forEach((element: any) => {
        //iteramos sobre los datos del observable
        this.listaAlquileres.push({
          id: element.payload.doc.id, // asignamos a cada alquiler del array su id del registro
          ...element.payload.doc.data(), // y el resto de los atributos/campos con spread operator
        });
      });
    });
  }

   /**
   * Elimina un alquiler llamando al servicio para confirmación de eliminación
   * @param id del aluiler a eliminar
   * @param nombreJuego del alquiler para mostrarlo en la notificación
   */
  eliminarAlquiler(id: string, nombreJuego: string) {
    this._notificacionesService.confirmarEliminar(id, nombreJuego, 'alquiler', 'alquileres');
  }
}
