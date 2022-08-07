import { Entity, Column, OneToMany } from "typeorm"
import { BaseColumns } from "./BaseColumns"
import { Album } from "./interactions/Album"
import { Comment } from "./interactions/Comment"
import { Post } from "./interactions/Post"

@Entity()
export class User extends BaseColumns {

    @Column({
        length: 20
    })
    username: string

    @OneToMany(() => Post, (post) => post.user_id)
    posts: Post[];

    @OneToMany(() => Album, (album) => album.user_id)
    albums: Album[];

    @OneToMany(() => Comment, (comment) => comment.user_id)
    comments: Comment[];

}
