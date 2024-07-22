import { registrarUsuario } from '@/Firebase/Promesas';
import { InitialStateUsuario } from '@/Initial States/initialStates';
import { Usuario } from '@/Interfaces/interfaces';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const RegistroUsuario = () => {
    const router = useRouter();
    const [usuario, setUsuario] = useState<Usuario>(InitialStateUsuario);
    
    
    const validarLargoMinimo = (nombre:string, value:string) => {
        setUsuario({...usuario, [nombre]:value})
    }

    const registrar = () => {
        console.log('Usuario a registrar: ', JSON.stringify(usuario, null, 2));
        registrarUsuario(usuario)
            .then(() => {
                alert('Registrado con éxito');
            })
            .catch((e) => {
                alert('Error al registrar: ' + e);
            });
    };

    const volverAdmin = () => {
        router.push('/paginaAdmin');
    }

    return (
        <>
            <main>
                <div className='titulos'>
                    <h1>Registrar un usuario en el sistema</h1>
                </div>
                <div className='cajaBase'>
                    <Form className='registroUsuarios'>
                        <Form.Group>
                            <Form.Label>Rut a registrar en sistema</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='1234567-8'
                                name='rut'
                                onChange={(e) => {validarLargoMinimo(e.currentTarget.name, e.currentTarget.value);}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Ingrese contraseña'
                                name='clave'
                                onChange={(e) => {validarLargoMinimo(e.currentTarget.name, e.currentTarget.value);}}
                            />
                        </Form.Group>
                    </Form>
                    <Button
                        variant='success'
                        type='button'
                        onClick={registrar}
                        className='btnRegistroUsuario'
                    >
                        Registrar Usuario
                    </Button>
                    <Button type='button' variant='danger' className='btnVolverUsuario' onClick={volverAdmin}>
                        Volver
                    </Button>
                </div>
            </main>
        </>
    );
};

export default RegistroUsuario;
