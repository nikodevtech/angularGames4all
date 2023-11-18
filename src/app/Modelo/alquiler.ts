
export interface Alquiler {
    id?: string;
    juegoData: {
        nombre: string;
        genero: string;
        plataforma: string;
    };
    usuarioData: {
        nombre: string;
        dni: string;
        direccion: string;
        email: string;
    };
    idJuego: string;
    idUsuario: string;
    fechaActualizacion: Date;
    fechaCreacion?: Date;
}

