import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Pedido } from './Pedido';

@Entity()
export class ProductoPedido {
    @PrimaryGeneratedColumn()
    id!: number; // Inicializado por TypeORM

    @ManyToOne(() => Pedido, (pedido) => pedido.productos, { nullable: false })
    pedido!: Pedido; // Relación ManyToOne, inicializada por TypeORM

    @Column()
    productoId: number = 0; // Inicializado con un valor predeterminado

    @Column()
    cantidad: number = 1; // Inicializado con un valor predeterminado
}


