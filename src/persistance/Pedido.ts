import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductoPedido } from './ProductoPedido';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id!: number; // Inicializado automáticamente por TypeORM

    @Column()
    fecha: Date = new Date(); // Fecha inicializada con un valor predeterminado

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    total: number = 0; // Total inicializado con un valor predeterminado

    @OneToMany(() => ProductoPedido, (productoPedido) => productoPedido.pedido, { cascade: true })
    productos!: ProductoPedido[]; // TypeORM manejará esta propiedad
}


