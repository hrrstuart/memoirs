import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Album } from "./Album"
import { BaseColumns } from "./BaseColumns"
import { Post } from "./Post"

@Entity()
export class User extends BaseColumns {

    @Column({
        length: 20
    })
    username: string

    @OneToMany(() => Post, (post) => post.owner)
    posts: Post[];

    @OneToMany(() => Album, (album) => album.owner)
    albums: Album[];

}
