import Link from "next/link";
import { useRouter } from "next/router";
import { use, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

export default function Home() {

  const router = useRouter();
  
  // Estados para el usuario y contraseña

  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  // Estado para verificar si el usuario existe
  const [usuarioExistente, setUsuarioExistente] = useState(false)

  // Estado para mostrar diferentes errores
  const [mensaje , setMensaje] = useState('')


  // Iniciar Sesión con el usuario admin admin.
  const iniciarSesion = () => {
    if (usuario === 'admin' && contrasena === 'admin') {
      setUsuarioExistente(true);
      setMensaje('');
      // Redirrecionar a la página de administrador
      router.push('/paginaAdmin')
    } else {
      setMensaje('Usuario o contraseña incorrecta')
    }
  }

  const validarLargo = (valor:string) => {
    if(valor.length > 4){
      setMensaje('');
    } else {
      setMensaje('Debes ingresar al menos 4 caracteres')
    }
    setUsuario(valor);
  }


  return (
    <>
      <main>
        <div className="cajaInicio">
          <h1> Iniciar Sesión </h1>
          <Form>
            {mensaje && <Alert variant="danger">{mensaje}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre usuario"
                value={usuario}
                onChange={(e) => {validarLargo(e.currentTarget.value)}}
                required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
               type="password" 
               placeholder="Ingrese contraseña" 
               value={contrasena}
               onChange={(e) => setContrasena(e.target.value)}/>
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit" className="btnLogin" onClick={iniciarSesion}>Iniciar Sesión</Button>
        </div>
      </main>
    </>
  );
}
