import { Entity, Column, OneToMany } from "typeorm"
import { BaseColumns } from "./BaseColumns"
import { Album } from "./interactions/album/Album"
import { AlbumMember } from "./interactions/album/AlbumMember"
import { Comment } from "./interactions/post/Comment"
import { Post } from "./interactions/post/Post"

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

    @OneToMany(() => AlbumMember, (album) => album.member_id)
    albums_part_of: AlbumMember[];

}
