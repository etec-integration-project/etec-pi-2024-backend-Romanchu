import express from 'express';
import {registroUsuario} from '../controller/user.controller';
import { contactoController } from '../controller/contacto.controller';
import { obtenerPedidos } from '../controller/pedido.controller';
import { crearPedidos } from '../controller/pedido.controller';
const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola');
});


mainRouter.post('/api/registro', registroUsuario);
mainRouter.post('/api/contacto', contactoController);
mainRouter.get('/api/pedidos', obtenerPedidos);
mainRouter.post('/api/pedidos', crearPedidos)

export { mainRouter };  