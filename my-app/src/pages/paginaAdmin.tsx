import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'

// Página de administrador

const paginaAdmin = () => {
  const router = useRouter()
  const volverInicio = () => {
    // Redirrecionar a la página de inicio
    router.push('/')
  }
  const registrarUsuario = () => {
    // Redirrecionar a la página de registro de usuario
    router.push('/registroUsuario')
  }
  const registrarContacto = () => {
    // Redirrecionar a la página de registro de usuario
    router.push('/registroContacto')

  }
  const mostrarContacto = () => {
    // Redirrecionar a la página de registro de usuario
    router.push('/mostrarContactos')
  }

  return (
    <>
        <main>
            <div className='titulos'>
                <h1> Bienvenido Administrador </h1>
            </div>
            <div className='cajaBase'>
              <Container className='cajaBotones'>
                <Row className='primerosBotones'>
                  <div>
                  <Image src='https://icorp.com.mx/wp-content/uploads/2023/06/1-Gestion-de-Operaciones-de-TI.webp' roundedCircle className='imagenAdmin'/>
                  </div>
                  <Col>
                    <Button type='button' variant='light' className='btnUsuario' onClick={registrarUsuario}>Registrar nuevo usuario</Button>
                    <Button type='button' variant='light' className='btnUsuario' onClick={registrarContacto}>Registrar nuevo contacto</Button>
                    <Button type='button' variant='light' className='btnMostrar' onClick={mostrarContacto}>Mostrar contactos registrados</Button>
                    <Button type='button' variant='light' className='btnSalir' onClick={volverInicio}>Cerrar Sesión</Button>
                  </Col>
                </Row>
              </Container>
            </div>
            
        </main>
    </>
  )
}
export default paginaAdmin