import { Request, Response } from 'express';
import { AppDataSource } from '../persistance/db';
import { Pedido } from '../persistance/Pedido';
import { ProductoPedido } from '../persistance/ProductoPedido';

// Define el tipo para los productos recibidos
interface ProductoCarrito {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// Crear un pedido
export const crearPedidos = async (req: Request, res: Response): Promise<Response> => {
    const productos: ProductoCarrito[] = req.body.productos;

    // Validar si el carrito está vacío
    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío' });
    }

    try {
        // Crear un nuevo pedido
        const pedido = new Pedido();
        pedido.fecha = new Date();
        pedido.total = productos.reduce((acc, item: ProductoCarrito) => acc + item.price * item.quantity, 0);

        // Guardar el pedido en la base de datos
        await AppDataSource.manager.save(pedido);

        // Guardar los productos asociados al pedido
        const productosPedidos = productos.map((producto) => {
            const productoPedido = new ProductoPedido();
            productoPedido.pedido = pedido;
            productoPedido.productoId = producto.id; // ID del producto
            productoPedido.cantidad = producto.quantity;
            return productoPedido;
        });

        // Guardar los productos relacionados en la base de datos
        await AppDataSource.manager.save(productosPedidos);

        return res.status(201).json({ mensaje: 'Pedido creado con éxito', pedidoId: pedido.id });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        return res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

// Obtener todos los pedidos
export const obtenerPedidos = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Obtener todos los pedidos con sus productos asociados
        const pedidos = await AppDataSource.getRepository(Pedido)
            .createQueryBuilder('pedido')
            .leftJoinAndSelect('pedido.productos', 'productoPedido')
            .getMany();

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
};
