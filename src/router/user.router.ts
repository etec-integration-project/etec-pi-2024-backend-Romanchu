import { Router } from 'express';
import { registroUsuario, loginUsuario } from '../controller/user.controller';

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

// Ruta para inicio de sesión
userRouter.post('/login', async (req, res) => {
    try {
        await loginUsuario(req, res);
    } catch (error) {
        console.error('Error en la ruta /login:', error);
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
});

export default userRouter;

