
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
    fechaAlquiler: Date;
    fechaEntrega: Date;
    fechaActualizacion: Date;
    fechaCreacion?: Date;
}

