import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    post_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // This isn't showing on database
    @ManyToMany(type => User)
    @JoinColumn()
    owner: User;

    @Column()
    file_location: string;
}