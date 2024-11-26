import { Router } from 'express';
import { contactoController } from '../controller/contacto.controller'; // Asegúrate de tener el controlador

const contactoRouter = Router();

// Ruta para guardar un nuevo contacto
contactoRouter.post('/enviar', contactoController);

export default contactoRouter;
