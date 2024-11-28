import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number; // Agrega el operador '!' para indicar que será inicializado por TypeORM

    @Column({ unique: true })
    username!: string; // También aplica '!' a las demás propiedades obligatorias

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    constructor ( username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


