import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { Contacto } from '../persistance/Contacto'; 

export const contactoController = async (req: Request, res: Response): Promise<Response> => {
    const { nombre, email, mensaje } = req.body;

    // Validación de datos: Asegúrate de que los campos no estén vacíos
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Crear un nuevo contacto
        const contacto = new Contacto();
        contacto.nombre = nombre;
        contacto.email = email;
        contacto.mensaje = mensaje;

        // Guardar el contacto en la base de datos
        await AppDataSource.manager.save(contacto);

        // Responder con éxito
        return res.status(201).json({ mensaje: 'Mensaje enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        
        // Responder en caso de error
        return res.status(500).json({ error: 'Error al guardar el mensaje' });
    }
};
