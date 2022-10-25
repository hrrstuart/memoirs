import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    username: string;

    @Column()
    email: string;

    @Column({ nullable: false })
    password: string;

}