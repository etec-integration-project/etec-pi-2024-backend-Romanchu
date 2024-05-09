import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class cart {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    cart!: string


    constructor( cart: string) {
        this.cart = cart;
    }

}