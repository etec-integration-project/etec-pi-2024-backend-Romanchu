import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contacto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    email!: string;

    @Column('text')
    mensaje!: string;
}
