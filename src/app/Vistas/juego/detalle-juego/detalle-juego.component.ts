import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Juego } from 'src/app/Modelo/juego';
import { FirebaseService } from 'src/app/Servicios/firebase.service';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.component.html',
  styleUrls: ['./detalle-juego.component.css'],
})
export class DetalleJuegoComponent {
  createJuego: FormGroup; //Representa el formulario
  submitted = false; // Para controlar si el formulario ha sido enviado y si es invalido poder dar info
  loading = false; //Para poder controlar cuando mostrar el spinner de bootstrap
  id: string | null; //Para recibir el id como param para editar o null para crear
  titulo = 'Registrar nuevo juego';
  textoButton = 'Registrar';

  constructor(
    private formBuilder: FormBuilder, //Dependencia para form reactivo
    private _firebaseService: FirebaseService,
    private router: Router, //Dependecia para navegar entre rutas
    private toastr: ToastrService, //Dependencia para alerts con estilo
    private route: ActivatedRoute //Dependencia para acceder al id por la ruta
  ) {
    // Inicializa el formulario con formBuilder y define campos con validadores
    this.createJuego = this.formBuilder.group({
      //crea un FormGroup con estos campos
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      fechalanzamiento: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id'); //capturamos el id de la url
  }

  ngOnInit(): void {
    this.esEditar();
  }

  /**
   * Gestiona la lógica si hay que agregar o editar un juego
   *  en Firebase.
   */
  agregarEditarJuego(): void {
    this.submitted = true;
    //Con este condicional si falta algun dato requerido en el formulario no se crea o modifica el juego
    if (this.createJuego.invalid) {
      return;
    }
    // Si el formulario es valido, se crea o se actualiza el juego

    if (this.id === null) {
      this.registrarJuego();
    } else {
      this.editarJuego(this.id);
    }
  }

  /**
   * Actualiza la información de un juego
   *  existente en Firebase.
   * @param id del juego
   * 
   * @remarks Se extraen los datos del formulario y se actualiza el juego con el ID proporcionado.
   * La fecha de actualización se establece en la fecha actual.
   * Muestra un mensaje de éxito y redirige a la lista de juegos.
   */
  editarJuego(id: string) {
    this.loading = true;

    const juego: Juego = {
      nombre: this.createJuego.value.nombre,
      genero: this.createJuego.value.genero,
      plataforma: this.createJuego.value.plataforma,
      fechaLanzamiento: this.createJuego.value.fechalanzamiento,
      fechaActualizacion: new Date(),
    };

    this._firebaseService
      .actualizar('juegos', id, juego)
      .then(() => {
        this.loading = false;
        this.toastr.info(
          'El juego fue actualizado con exito',
          'Juego Actualizado'
        );
        this.router.navigate(['/juegos/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Agrega un nuevo juego
   * 
   * @remarks
   * Se crea un objeto juego
   *  con los datos del formulario y se llama al servicio para agregarlo a Firebase.
   * Muestra un mensaje de éxito, detiene la carga y redirige a la lista de juegos.
   */
  registrarJuego() {
    this.loading = true;
    const juego: Juego = {
      nombre: this.createJuego.value.nombre,
      genero: this.createJuego.value.genero,
      plataforma: this.createJuego.value.plataforma,
      fechaLanzamiento: this.createJuego.value.fechalanzamiento,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this._firebaseService
      .insertar('juegos', juego)
      .then(() => {
        this.toastr.success(
          'El juego fue registrado con exito',
          'Juego Registrado'
        );
        this.loading = false;
        this.router.navigate(['/juegos/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Verifica si se esta editando o creando un nuevo juego
   * 
   * para mostrar los campos del form con los datos correspondientes
   */
  esEditar() {
    if (this.id !== null) {
      this.loading = true;
      this.textoButton = 'Editar';
      this.titulo = 'Editar Juego';
      this._firebaseService
        .obtenerPorId('juegos', this.id)
        .subscribe((respuesta) => {
          this.loading = false;
          this.createJuego.setValue({
            nombre: respuesta.payload.data()['nombre'],
            genero: respuesta.payload.data()['genero'],
            plataforma: respuesta.payload.data()['plataforma'],
            fechalanzamiento: respuesta.payload.data()['fechaLanzamiento'],
          });
        });
    }
  }
}
