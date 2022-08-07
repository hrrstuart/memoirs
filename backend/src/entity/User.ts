import { Entity, Column, OneToMany } from "typeorm"
import { BaseColumns } from "./BaseColumns"
import { Album } from "./interactions/Album"
import { Post } from "./interactions/Post"

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
