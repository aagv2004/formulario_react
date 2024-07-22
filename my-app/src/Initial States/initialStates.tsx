import { Contacto } from '../Interfaces/interfaces';
import { Usuario } from '../Interfaces/interfaces';

export const InitialStateContacto: Contacto = {
    nombre: '',
    apellido: '',
    telefono: '',
    nivelImportancia: '',
    redesSociales: {
        facebook: false,
        instagram: false,
        twitter: false,
        linkedin: false,
        whatsapp: false,
    },
    asunto: ''
}

export const InitialStateUsuario: Usuario = {
    rut: '',
    clave: ''
}