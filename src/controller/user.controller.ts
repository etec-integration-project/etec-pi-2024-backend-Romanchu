import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { User } from '../persistance/user';

export const crearUsuario = async (req: Request, res: Response) => {
    console.log("Datos: ", req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const newUser = new User(username, email, password);
        try {
            
            await AppDataSource.manager.save(newUser);
    
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





