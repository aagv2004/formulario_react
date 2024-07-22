import React, { use, useEffect, useState } from 'react'
import { Contacto } from '../Interfaces/interfaces'
import { InitialStateContacto } from '@/Initial States/initialStates'
import { eliminarContacto, obtenerContacto, obtenerContactos } from '@/Firebase/Promesas'
import { Button, Modal, Table } from 'react-bootstrap'
import path from 'path'
import Link from 'next/link'
import { useRouter } from 'next/router'

const mostrarContactos = () => {
    // Apartado de estados
    const [modal, setModal] = useState(false);
    const [contactos, setContactos] = useState<Contacto[]>([])
    const [elegido, setElegido] = useState<Contacto | null>(null)


    const router = useRouter()
    const volverAdmin = () => {
        router.push('/paginaAdmin')
    }

    const mostrar = () => {
        obtenerContactos().then((contactos) => {
            console.log(contactos)
            setContactos(contactos)
    })
    }
    useEffect(() => {
        mostrar()
    }, [])


    const abrirModal = (contacto:Contacto) => {
        setElegido(contacto);
        setModal(true);
    };

    const cerrarModal = () => {
        setModal(false);
        setElegido(null)
    }

    const eliminar = () => {
        if (elegido) {
            eliminarContacto(elegido.key!);
            setContactos(contactos.filter(c => c.key !== elegido.key));
            cerrarModal();
        }
        
    }

  return (
    <>
        <main>
            <Modal show={modal} onHide={cerrarModal} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {elegido && (
                        <>
                            ({elegido.nombre} {elegido.apellido}) <br/>
                            ¿Está seguro que desea eliminar este contacto?
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={cerrarModal} >Cancelar</Button>
                    <Button variant='danger' onClick={eliminar}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
            <div className='titulos'>
                <h1> Contactos </h1>
                <Button type='button' variant='primary' className='btnVolver' onClick={volverAdmin}>Volver</Button>
            </div>
            <div className='cajaBase'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Nivel de importancia</th>
                            <th>Redes sociales</th>
                            <th>Asunto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contactos.map((c, i) => {
                                return <tr key={i}>
                                    <td>{c.nombre}</td>
                                    <td>{c.apellido}</td>
                                    <td>{c.telefono}</td>
                                    <td>{c.nivelImportancia}</td>
                                    <td>{c.redesSociales.facebook ? 'Facebook ' : ''}{c.redesSociales.instagram ? 'Instagram ' : ''}{c.redesSociales.twitter ? 'Twitter ' : ''}{c.redesSociales.linkedin ? 'Linkedin ' : ''}{c.redesSociales.whatsapp ? 'Whatsapp ' : ''}</td>
                                    <td>{c.asunto}</td>
                                    <td>
                                        <Link href={{ pathname: '/editarContacto', query: {key:c.key}}}>
                                         <Button variant='success' className='btnTabla'>
                                            Actualizar
                                         </Button>
                                        </Link>
                                        <Button variant='danger' className='btnTabla' onClick={()=> abrirModal(c)}>Eliminar</Button>
                                    </td>
                                    </tr>
                            })
                        }
                    </tbody>
                </Table>

            </div>
        </main>
    </>
  )
}

export default mostrarContactos