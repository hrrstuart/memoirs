import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
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
    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @Column()
    file_location: string;
}