import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductoPedido } from './ProductoPedido';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id!: number; // Inicializado automáticamente por TypeORM


    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    total!: number; // Total inicializado con un valor predeterminado

    @OneToMany(() => ProductoPedido, (productoPedido) => productoPedido.pedido, { cascade: true })
    productos!: string; // TypeORM manejará esta propiedad

    constructor (total: number, productos: string){
        this.total = total;
        this.productos = productos;
    }
}


