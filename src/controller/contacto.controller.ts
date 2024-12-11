import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { Contacto } from '../persistance/Contacto';

export const crearContacto = async (req: Request, res: Response) => {
    console.log("Datos: ", req.body);
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const mensaje = req.body.mensaje;
    try {
        const newContacto = new Contacto(nombre, correo, mensaje);
        try {
            
            await AppDataSource.manager.save(newContacto);
    
            // Responder con éxito
            return res.status(201).json({ mensaje: 'Mensaje enviado con éxito' });
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            return res.status(401).json({error: "Error"});
        }
        // Responder en caso de error
    } catch (err) {
        console.error("Error");
        return res.status(500).json({ error: 'Error al guardar el mensaje' });
    }
};
