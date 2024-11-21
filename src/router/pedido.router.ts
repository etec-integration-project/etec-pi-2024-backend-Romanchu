import { Router } from 'express';
import { crearPedido, obtenerPedidos } from '../controller/pedido.controller';

const pedidoRouter = Router();

// Ruta para crear un pedido
pedidoRouter.post('/', crearPedido);

// Ruta para obtener todos los pedidos
pedidoRouter.get('/', obtenerPedidos);

export default pedidoRouter;

