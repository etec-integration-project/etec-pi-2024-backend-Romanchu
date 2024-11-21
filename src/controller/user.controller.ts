import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { User } from '../persistance/user';

// Función para registrar un usuario
export const registroUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { usuario, correoElectronico, contrasena } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);

        // Verificar si el usuario ya existe
        const usuarioExistente = await userRepository.findOne({ where: { username: usuario } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new User();
        nuevoUsuario.username = usuario;
        nuevoUsuario.email = correoElectronico;
        nuevoUsuario.password = contrasena;
        await userRepository.save(nuevoUsuario);

        return res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

// Función para iniciar sesión
export const loginUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const userRepository = AppDataSource.getRepository(User);

        // Buscar al usuario con el email y contraseña proporcionados
        const usuario = await userRepository.findOne({ where: { email, password } });
        if (usuario) {
            return res.json({ success: true, mensaje: 'Iniciaste sesión con éxito' });
        } else {
            return res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
