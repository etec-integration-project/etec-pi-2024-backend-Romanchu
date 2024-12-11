import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contacto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    email!: string;

    @Column()
    mensaje!: string;
    
    constructor(nombre: string, email: string, mensaje: string) {
        this.nombre = nombre;
        this.email = email;
        this.mensaje = mensaje;
    }
}

