import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { Pedido } from '../persistance/Pedido';

// Crear un pedido
export const crearPedido = async (req: Request, res: Response) => {
    console.log("Datos: ", req.body);
    const total = req.body.total;
    const productos = req.body.productos;
    try {
        const newPedido = new Pedido(total, productos);
        try {
            
            await AppDataSource.manager.save(newPedido);
    
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


export const getPedidos = async (_:Request, res: Response) => {
    try{
        const pedidos = await AppDataSource.manager.find(Pedido);
        res.json(pedidos)
    } catch(error){
        console.log(error)
        res.json(500).send("Error del servidor")
    }
}