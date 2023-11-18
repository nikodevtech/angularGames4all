import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  /**
   * Metodo para insertar un nuevo objeto en una colección determinada
   * @param coleccion de la base de datos en la que se va a insertar
   * @param data objeto a insertar
   * @returns una promesa
   */
  insertar(coleccion: string, data: any): Promise<any> {
    return this.firestore.collection(coleccion).add(data);
  }

  /**
   * Obtiene todos los objetos de una colección determinada
   * @param coleccion de la base de datos que se va a obtener
   * @returns un observable con todos los objetos de la colección 
   */
  obtenerTodos(coleccion: string): Observable<any> {
    return this.firestore.collection(coleccion, ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  /**
   * Elimina un objeto de una colección determinada
   * @param coleccion de la base de datos que se va a eliminar
   * @param id id del objeto que se va eliminar
   * @returns una promesa
   */
  eliminar(coleccion: string, id: string): Promise<any> {
    return this.firestore.collection(coleccion).doc(id).delete();
  }

  /**
   * Obtiene un objeto de una colección
   * @param coleccion dela base de datos que en la que se va a buscar
   * @param id del objeto que se va a obtener
   * @returns un observable con el objeto
   */
  obtenerPorId(coleccion: string, id: string): Observable<any> {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
  }

  /**
   * Modifica un objeto de una colección determinada
   * @param coleccion de la base de datos que se va a modificar
   * @param id del objeto que se va a modificar
   * @param data objeto modificado para ser actualizado
   * @returns una promesa
   */
  actualizar(coleccion: string, id: string, data: any): Promise<any> {
    return this.firestore.collection(coleccion).doc(id).update(data);
  }
}
