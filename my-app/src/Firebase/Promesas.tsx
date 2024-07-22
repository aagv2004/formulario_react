import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Contacto, Usuario } from "@/Interfaces/interfaces";

export const registrarContacto = async(contacto:Contacto) => {
    const docRef = await addDoc(collection(db, 'contactos'), contacto)
}

export const registrarUsuario = async(usuario:Usuario) => {
    const docRef = await addDoc(collection(db, 'usuarios'), usuario)
}

export const obtenerContactos = async()=> {
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

export const obtenerContacto = async(key:string) => {
    const docRef = doc(db, "contactos", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let contacto:Contacto = {
            nombre: docSnap.data().nombre,
            apellido: docSnap.data().apellido,
            telefono: docSnap.data().telefono,
            nivelImportancia: docSnap.data().nivelImportancia,
            redesSociales: docSnap.data().redesSociales,
            asunto: docSnap.data().asunto,
            key:docSnap.id
        }
        return contacto
    } else {
        return undefined
    }

}

export const actualizarContacto = async(c:Contacto)=>{
    const ref = doc(db, "contactos", c.key!);
    // Para guardar sin key
    await updateDoc(ref, {
        nombre: c.nombre,
        apellido: c.apellido,
        telefono: c.telefono,
        nivelImportancia: c.nivelImportancia,
        redesSociales: c.redesSociales,
        asunto: c.asunto
    })
    // Para guardar con Key, es decir, todo.
     // await updateDoc(ref, {...p})
}