import { Router } from 'express';
import { registroUsuario} from '../controller/user.controller';

const userRouter = Router();

// Ruta para registro de usuarios
userRouter.post('/registro', async (req, res) => {
    try {
        await registroUsuario(req, res);
    } catch (error) {
        console.error('Error en la ruta /registro:', error);
        res.status(500).json({ error: 'Error en el servidor al registrar usuario' });
    }
});



export default userRouter;

