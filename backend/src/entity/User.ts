import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({
        length: 20
    })

    username: string

}
