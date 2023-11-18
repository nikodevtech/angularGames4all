import { Component } from '@angular/core';
import { Alquiler } from 'src/app/Modelo/alquiler';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css'],
})
export class ListaAlquileresComponent {
  listaAlquileres: Alquiler[] = []; 
  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getAlquileres();
  }

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
  eliminarAlquiler(id: string) {
    this._firebaseService
      .eliminar('alquileres', id)
      .then(() => {
        console.log('Alquiler eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  confirmarAccion(id: string ) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el alquiler?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#18BE79',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarAlquiler(id);
        Swal.fire(
          '¡Acción completada!',
          'Usuario eliminado con éxito.',
          'success'
        );
      }
    });
  }
}
