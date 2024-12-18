import { DataSource } from "typeorm";
import { User } from "./user";
import { Pedido } from "./Pedido"; // Nueva entidad Pedido
import { ProductoPedido } from "./ProductoPedido"; // Nueva entidad ProductoPedido
import { Contacto } from "./Contacto";
import "reflect-metadata";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true, // Esto asegura que las tablas se sincronicen automáticamente
  logging: true,
  entities: [User, Pedido, ProductoPedido, Contacto], // Incluye todas las entidades
  subscribers: [],
  migrations: []
});


// Tipos para manejar productos y usuarios (puedes eliminarlos si no los usas en TypeORM)
export type Producto = {
    id: number;
    img: string;
    name: string;
    price: number;
    quantity: number;
};

export type Usuario = {
    id: number;
    username: string;
    email: string;
    password: string;
    password2: string;
};

export type Contact = {
    id: number;
    nombre: string;
    email: string;
    mensaje: string;
};

// Base de datos de prueba en memoria (si es necesario para pruebas sin conexión)
export const pdb: Array<Pedido> = [
    {
        id: 1,
        total: 1,
        productos: "Pad Olas",
    }
];

export const udb: Array<Usuario> = [
    {
        id: 1,
        username: "roma",
        email: "roma@gmail.com",
        password: "romanchu",
        password2: "romanchu"
    }
];
