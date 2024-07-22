export interface Contacto {
    key?: string,
    nombre: string,
    apellido: string,
    telefono: string,
    nivelImportancia: string,
    redesSociales: {
        facebook: false,
        instagram: false,
        twitter: false,
        linkedin: false,
        whatsapp: false,
    },
    asunto: string
}

export interface Usuario {
    rut: string,
    clave: string
}