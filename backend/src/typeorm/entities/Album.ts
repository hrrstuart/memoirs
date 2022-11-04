import { Entity, Column, BeforeInsert, ManyToOne } from "typeorm";
import * as bcrypt from "bcrypt";
import { BasicEntity } from "./BasicEntity";
import { User } from "./User";

@Entity()
export class Album extends BasicEntity {

    @Column({ type: "varchar", length: 15 })
    title: string;

    @Column({ type: "varchar", length: 155 })
    description: string;

    @ManyToOne(() => User, (user) => user.albums)
    owner: User;

}