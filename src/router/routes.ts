import express from 'express';
import { addProductsToDB, addUserToDB, getProducts, loginUser } from '../controler/controler';
const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola');
});

mainRouter.get('/producto', getProducts);
mainRouter.post('/producto/:añadir', addProductsToDB);
mainRouter.post('/registro', addUserToDB);
mainRouter.get('/login', loginUser)

export { mainRouter };  