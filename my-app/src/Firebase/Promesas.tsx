import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Contacto, Usuario } from "@/Interfaces/interfaces";

export const registrarContacto = async(contacto:Contacto) => {
    const docRef = await addDoc(collection(db, 'contactos'), contacto)
}

export const registrarUsuario = async(usuario:Usuario) => {
    const docRef = await addDoc(collection(db, 'usuarios'), usuario)
}

export const obtenerContacto = async()=> {
    const colRef = collection(db, "contactos");
    const querySnapshot = await getDocs(colRef);
    let contactos:Contacto[] = []
    querySnapshot.forEach((doc) => {
        let contacto:Contacto = {
            key: doc.id,
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            telefono: doc.data().telefono,
            nivelImportancia: doc.data().nivelImportancia,
            redesSociales: doc.data().redesSociales,
            asunto: doc.data().asunto
        }
        contactos.push(contacto)
    });
    return contactos
}

export const actualizarContacto = async(contacto:Contacto) => {
    const docRef = doc(db, 'contactos', contacto.key)
    await updateDoc(docRef, contacto)
}
