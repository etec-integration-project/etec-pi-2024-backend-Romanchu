import express from 'express';
import { AppDataSource } from './persistance/db';
import { mainRouter } from './router/routes';
import pedidoRouter from './router/pedido.router';
import userRouter from './router/user.router'; // Rutas de usuarios
import cors from 'cors';
import { config } from 'dotenv';

// Cargar las variables de entorno
config();

// Imprimir variables de entorno para depuración
console.log(`Database: ${process.env.DATABASE_NAME}`);
console.log(`Username: ${process.env.DATABASE_USERNAME}`);
console.log(`Password: ${process.env.DATABASE_PASSWORD}`);
console.log(`Host: ${process.env.DATABASE_HOST}`);

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors())

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/', mainRouter);
app.use('/api/pedidos', pedidoRouter);
app.use('/api/usuarios', userRouter); // Rutas de usuarios

// Inicialización de la base de datos
AppDataSource.initialize()
    .then(async () => {
        console.log('Base de datos conectada');

        // Ejecutar migraciones al iniciar la aplicación
        await AppDataSource.runMigrations();

        // Crear datos iniciales si no existen
        await crearDatosIniciales();

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo en: http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error al inicializar la base de datos:', err);
        process.exit(1); // Salir del proceso si ocurre un error crítico
    });

// Función para crear datos iniciales
const crearDatosIniciales = async () => {
    try {
        const userRepository = AppDataSource.manager.getRepository('User');

        // Verificar si hay usuarios existentes
        const userExist = await userRepository.find();
        if (userExist.length === 0) {
            const user1 = {
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123',
            };
            await userRepository.save(user1);
            console.log('Usuario inicial agregado');
        }
    } catch (error) {
        console.error('Error al crear datos iniciales:', error);
    }
};
