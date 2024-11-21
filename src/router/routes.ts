import express from 'express';
import {addUserToDB, loginUser } from '../controller/controller';
const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola');
});


mainRouter.post('/registro', addUserToDB);
mainRouter.get('/login', loginUser)

export { mainRouter };  