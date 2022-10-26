import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;

    @Column({ nullable: false })
    username: string;

    @Column()
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

}