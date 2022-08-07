import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Album } from "./Album";
import { BaseColumns } from "../BaseColumns";
import { User } from "../User";
import { Comment } from "./Comment";

@Entity()
export class Post extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.posts)
    user_id: User;

    @ManyToOne(() => Album, (album) => album.posts)
    original_album: Album;

    //  A post can be placed on multiple albums by clicking a "share to other album" button
    @OneToMany(() => Album, (album) => album.referenced_posts, {
        nullable: true,
        cascade: true,
    })
    other_albums: Album[];

    @OneToMany(() => Comment, (comment) => comment.post_id)
    comments: Comment[];

    @Column()
    file_location: string;

}