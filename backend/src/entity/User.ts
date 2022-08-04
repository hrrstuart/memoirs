import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Album } from "./Album"
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

    @OneToMany(() => Post, (post) => post.owner)
    posts: Post[];

    @OneToMany(() => Album, (album) => album.owner)
    albums: Album[];

}
