// IMPORTACIONES FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./Credenciales";

// APP FIREBASE Y EXPORTAR BASE DATOS
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);