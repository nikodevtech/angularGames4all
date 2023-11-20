import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Modelo/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  createUsuario: FormGroup; //Representa el formulario
  submitted = false; // Para controlar si el formulario ha sido enviado y si es invalido poder dar info
  loading = false; //Para poder controlar cuando mostrar el spinner de bootstrap
  id: string | null; //Para recibir el id como param para editar o null para crear
  titulo = 'Registrar nuevo usuario';
  textoButton = 'Registrar';

  constructor(
    private formBuilder: FormBuilder, //Dependencia para form reactivo
    private _firebaseService: FirebaseService,
    private router: Router, //Dependecia para navegar entre rutas
    private route: ActivatedRoute ,//Dependencia para acceder al id por la ruta
    private _notificacionesService: NotificacionesService //Dependencia para mostrar mensajes
  ) {
    // Inicializa el formulario con formBuilder y define campos con validadores
    this.createUsuario = this.formBuilder.group({
      //crea un FormGroup con estos campos
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id'); //capturamos el id de la url
  }

  ngOnInit(): void {
    this.esEditar();
  }

  /**
   * Gestiona la lógica si hay que agregar o editar un usuario en Firebase
   * dependiendo de si el id es null o no.
   */
  agregarEditarUsuario(): void {
    this.submitted = true;
    //Con este condicional si falta algun dato requerido en el formulario no se crea el usuario
    if (this.createUsuario.invalid) {
      return;
    }
    // Si el formulario es valido, se crea o se actualiza el usuario
    if (this.id === null) {
      this.registrarUsuario();
    } else {
      this.editarUsuario(this.id);
    }
  }

  /**
   * Actualiza la información de un usuario existente en Firebase.
   * @param id del usuario
   * @remarks Se extraen los datos del formulario y se actualiza el usuario con el ID proporcionado.
   * La fecha de actualización se establece en la fecha actual.
   * Muestra un mensaje de éxito y redirige a la lista de usuarios.
   */
  editarUsuario(id: string) {
    this.loading = true;

    const usuario: Usuario = {
      nombre: this.createUsuario.value.nombre,
      dni: this.createUsuario.value.dni,
      direccion: this.createUsuario.value.direccion,
      email: this.createUsuario.value.email,
      fechaActualizacion: new Date(),
    };
    console.log(usuario);

    this._firebaseService
      .actualizar('usuarios', id, usuario)
      .then(() => {
        this.loading = false;
        this._notificacionesService.notificacionModificar("usuario");
        this.router.navigate(['/usuarios/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Agrega un nuevo usuario
   * @remarks
   * Se crea un objeto usuario con los datos del formulario y se llama al servicio para agregarlo a Firebase.
   * Muestra un mensaje de éxito, detiene la carga y redirige a la lista de usuarios.
   */
  registrarUsuario() {
    this.loading = true;
    const usuario: Usuario = {
      nombre: this.createUsuario.value.nombre,
      dni: this.createUsuario.value.dni,
      direccion: this.createUsuario.value.direccion,
      email: this.createUsuario.value.email,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this._firebaseService
      .insertar('usuarios', usuario)
      .then(() => {
        this._notificacionesService.notificacionRegistrar("usuario");
        this.loading = false;
        this.router.navigate(['/usuarios/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  /**
   * Verifica si se esta editando o creando un nuevo usuario
   * para mostrar los campos del form con los datos correspondientes
   */
  esEditar() {
    if (this.id !== null) {
      this.loading = true;
      this.textoButton = 'Editar';
      this.titulo = 'Editar usuario';
      this._firebaseService
        .obtenerPorId('usuarios', this.id)
        .subscribe((respuesta) => {
          this.loading = false;
          this.createUsuario.setValue({
            nombre: respuesta.payload.data()['nombre'],
            dni: respuesta.payload.data()['dni'],
            direccion: respuesta.payload.data()['direccion'],
            email: respuesta.payload.data()['email'],
          });
        });
    }
  }

}
