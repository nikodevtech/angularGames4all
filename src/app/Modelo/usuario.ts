export interface Usuario {
    id?: string;
    nombre: string;
    dni: string;
    direccion: string;
    email: string;
    fechaCreacion?: Date; //Cuando se registró por primera vez en el sistema
    fechaActualizacion: Date; //Cuando se actualizó el perfil
}
