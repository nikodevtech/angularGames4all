export interface Juego {
    id?: string; // Identificador único, se llenará automáticamente por Firebase
    nombre: string;
    genero: string;
    plataforma: string;
    fechaLanzamiento: Date;
    fechaActualizacion: Date;
    fechaCreacion?: Date;
}
