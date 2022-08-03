import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from "typeorm"
import { Post } from "./Post"

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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

}
