import React, { use, useEffect, useState } from 'react'
import { Contacto } from '../Interfaces/interfaces'
import { InitialStateContacto } from '@/Initial States/initialStates'
import { obtenerContacto, obtenerContactos } from '@/Firebase/Promesas'
import { Button, Table } from 'react-bootstrap'
import path from 'path'
import Link from 'next/link'
import { useRouter } from 'next/router'

const mostrarContactos = () => {
    const router = useRouter()
    const volverAdmin = () => {
        router.push('/paginaAdmin')
    }
    const [contactos, setContactos] = useState<Contacto[]>([])
    const mostrar = () => {
        obtenerContactos().then((contactos) => {
            console.log(contactos)
            setContactos(contactos)
    })
    }
    useEffect(() => {
        mostrar()
    }, [])

  return (
    <>
        <main>
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
                                         <Button variant='success'>
                                            Actualizar
                                         </Button>
                                        </Link>
                                        <Button variant='danger'>Eliminar</Button>
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