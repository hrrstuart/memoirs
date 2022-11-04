import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from "bcrypt";
import { BasicEntity } from "./BasicEntity";
import { Album } from "./Album";

@Entity()
export class User extends BasicEntity {

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
    }

    @OneToMany(() => Album, (album) => album.owner)
    albums: Album[];

}