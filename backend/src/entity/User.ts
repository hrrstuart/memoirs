import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({
        length: 20
    })
    username: string

}
