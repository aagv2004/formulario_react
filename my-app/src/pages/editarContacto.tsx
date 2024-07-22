
import { actualizarContacto, obtenerContacto } from '@/Firebase/Promesas';
import { InitialStateContacto } from '@/Initial States/initialStates';
import { Contacto } from '@/Interfaces/interfaces';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export const editarContacto = () => {
    const router = useRouter();
    const [contacto, setContacto] = useState<Contacto>(InitialStateContacto);
    
    useEffect(() => {
        const key = router.query.key;
        if (typeof key === 'string') {
            obtenerContacto(key).then((c) => {
                if (c != undefined) {
                    setContacto(c);
                } else {
                    alert("No se encontró el contacto");
                }
            });
        }
    }, [router.query.key]);

    
    const validarLargoMinimo = (nombre:string, value:string) => {
        if (nombre.startsWith('redesSociales')) {
            const redesSociales = {...contacto.redesSociales, [nombre.split('.')[1]]: value};
            setContacto({...contacto, redesSociales});
        } else {
            setContacto({...contacto, [nombre]: value});
        }
    }


    const Actualizar = () => {
        actualizarContacto(contacto).then(()=>{
            alert('Contacto actualizado')
            volverTabla()
        }).catch((e)=>{
            alert('Error al actualizar: ' + e)
        })
    };

    const volverTabla = () => {
        router.push('/mostrarContactos')
    }




  return (
    <>
            <main>
                <div className='titulos'>
                    <h1> Ingrese información de contacto </h1>
                    <Button type='button' variant='danger' className='btnVolver' onClick={volverTabla}>Volver</Button>
                </div>
                <div className='cajaBase'>
                    <Form>
                        <Form.Group className='grupoInfo'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese nombre'
                                name='nombre'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, e.currentTarget.value) }}
                            />
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingrese apellido'
                                name='apellido'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, e.currentTarget.value) }}
                            />
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type='phone'
                                placeholder='Ingrese teléfono'
                                name='telefono'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, e.currentTarget.value) }}
                            />
                            <Form.Label>Motivos de contacto</Form.Label>
                            <Form.Select aria-label='Default Select Example' name='asunto' onChange={(e) => { validarLargoMinimo(e.currentTarget.name, e.currentTarget.value) }}>
                                <option value='consultar'>Consultar</option>
                                <option value='negociar'>Negociar</option>
                                <option value='sociabilizar'>Sociabilizar</option>
                                <option value='jugar'>Jugar</option>
                                <option value='otros'>Otros</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='grupoRadio'>
                            <Form.Label>Nivel de necesidad de contacto</Form.Label>
                            <Form.Check
                                type='radio'
                                label='Alto'
                                name='nivelImportancia'
                                id='alto'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, 'Alto') }}
                            />
                            <Form.Check
                                type='radio'
                                label='Medio'
                                name='nivelImportancia'
                                id='medio'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, 'Medio') }}
                            />
                            <Form.Check
                                type='radio'
                                label='Bajo'
                                name='nivelImportancia'
                                id='bajo'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, 'Bajo') }}
                            />
                        </Form.Group>
                        <Form.Group className='redesSociales'>
                            <Form.Label>Redes para contacto</Form.Label>
                            <Form.Check
                                type='checkbox'
                                label='Facebook'
                                id='facebook'
                                onChange={(e) => { validarLargoMinimo('redesSociales', 'Facebook') }}
                            />
                            <Form.Check
                                type='checkbox'
                                label='Instagram'
                                id='instagram'
                                onChange={(e) => { validarLargoMinimo('redesSociales', 'Instagram') }}
                            />
                            <Form.Check
                                type='checkbox'
                                label='Twitter'
                                id='twitter'
                                onChange={(e) => { validarLargoMinimo('redesSociales', 'Twitter') }}
                            />
                            <Form.Check
                                type='checkbox'
                                label='Linkedin'
                                id='linkedin'
                                onChange={(e) => { validarLargoMinimo('redesSociales', 'Linkedin') }}
                            />
                            <Form.Check
                                type='checkbox'
                                label='Whatsapp'
                                id='whatsapp'
                                onChange={(e) => { validarLargoMinimo('redesSociales', 'Whatsapp') }}
                            />
                        </Form.Group>

                        <Form.Group className='asunto'>
                            <Form.Label>¿Por qué quiero que me contacten?</Form.Label>
                            <Form.Control
                                as='textarea'
                                className='areatexto'
                                placeholder='Quiero que me contacten por...'
                                rows={5}
                                name='asunto'
                                onChange={(e) => { validarLargoMinimo(e.currentTarget.name, e.currentTarget.value) }}
                            />
                        </Form.Group>
                    </Form>
                    <Button type='submit' variant='success' className='btnRegistroContacto' onClick={Actualizar}>Actualizar Contacto</Button>
                </div>
            </main>
        </>
  )
}
export default editarContacto