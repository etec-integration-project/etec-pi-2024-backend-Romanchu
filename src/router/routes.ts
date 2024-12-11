import express from 'express';
import { crearUsuario } from '../controller/user.controller';
import { crearContacto } from '../controller/contacto.controller';
import { crearPedido, getPedidos } from '../controller/pedido.controller';

const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola');
});


mainRouter.post('/api/registro', crearUsuario);
mainRouter.post('/api/contacto', crearContacto);
mainRouter.get('/api/pedidos', getPedidos);
mainRouter.post('/api/pedidos', crearPedido)

export { mainRouter };  