import { Usuario } from 'src/app/Modelo/usuario';
import { Alquiler } from 'src/app/Modelo/alquiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { Juego } from 'src/app/Modelo/juego';

@Component({
  selector: 'app-detalle-alquiler',
  templateUrl: './detalle-alquiler.component.html',
  styleUrls: ['./detalle-alquiler.component.css'],
})
export class DetalleAlquilerComponent {
  createAlquiler: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Registrar nuevo Alquiler';
  textoButton = 'Registrar';
  listaJuegos: Juego[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _firebaseService: FirebaseService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createAlquiler = this.formBuilder.group({
      juego: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.getJuegos();
    this.getUsuarios();
  }

  getUsuarios() {
    return this._firebaseService.obtenerTodos('usuarios').subscribe((data) => {
      this.listaUsuarios = data.map((usuario: any) => {
        return {
          id: usuario.payload.doc.id,
          ...usuario.payload.doc.data(),
        };
      });
    });
  }

  getJuegos() {
    return this._firebaseService.obtenerTodos('juegos').subscribe((data) => {
      this.listaJuegos = data.map((juego: any) => {
        return {
          id: juego.payload.doc.id,
          ...juego.payload.doc.data(),
        };
      });
    });
  }

  agregarEditarAlquiler(): void {
    this.submitted = true;
    if (this.createAlquiler.invalid) {
      return;
    }
    if (this.id === null) {
      this.registrarAlquiler();
    } else {
      this.editarAlquiler(this.id);
    }
  }

  editarAlquiler(id: string) {
    this.loading = true;

    const alquiler: Alquiler = {
      idJuego: this.createAlquiler.value.juego,
      idUsuario: this.createAlquiler.value.usuario,
      juegoData: this.getJuegoData(this.createAlquiler.value.juego),
      usuarioData: this.getUsuarioData(this.createAlquiler.value.usuario),
      fechaActualizacion: new Date(),
    };

    this._firebaseService
      .actualizar('alquileres', id, alquiler)
      .then(() => {
        this.loading = false;
        this.toastr.info(
          'El alquiler fue actualizado con éxito',
          'Alquiler Actualizado'
        );
        this.router.navigate(['/alquileres/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  registrarAlquiler() {
    this.loading = true;
    const alquiler: Alquiler = {
      idJuego: this.createAlquiler.value.juego,
      idUsuario: this.createAlquiler.value.usuario,
      juegoData: this.getJuegoData(this.createAlquiler.value.juego),
      usuarioData: this.getUsuarioData(this.createAlquiler.value.usuario),
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this._firebaseService
      .insertar('alquileres', alquiler)
      .then(() => {
        this.toastr.success(
          'El Alquiler fue registrado con éxito',
          'Alquiler Registrado'
        );
        this.loading = false;
        this.router.navigate(['/alquileres/listado']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  esEditar() {
    if (this.id !== null) {
      this.loading = true;
      this.textoButton = 'Editar';
      this.titulo = 'Editar Alquiler';
      this._firebaseService
        .obtenerPorId('alquileres', this.id)
        .subscribe((respuesta) => {
          this.loading = false;
          this.createAlquiler.setValue({
            juego: respuesta.payload.data()['idJuego'],
            usuario: respuesta.payload.data()['idUsuario'],
          });
        });
    }
  }

  private getJuegoData(idJuego: string): any {
    const juego = this.listaJuegos.find((juego) => juego.id === idJuego);
    if (juego) {
      return {
        nombre: juego.nombre,
        genero: juego.genero,
        plataforma: juego.plataforma,
      };
    } else {
      return {};
    }
  }

  private getUsuarioData(idUsuario: string): any {
    const usuario = this.listaUsuarios.find(
      (usuario) => usuario.id === idUsuario
    );
    if (usuario) {
      return {
        nombre: usuario.nombre,
        dni: usuario.dni,
        direccion: usuario.direccion,
        email: usuario.email,
      };
    } else {
      return {};
    }
  }
}
