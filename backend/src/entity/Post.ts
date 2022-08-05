import { Entity, Column, ManyToMany, ManyToOne } from "typeorm";
import { Album } from "./Album";
import { BaseColumns } from "./BaseColumns";
import { User } from "./User";

@Entity()
export class Post extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.posts)
    owner: User;

    @ManyToOne(() => Album, (album) => album.posts)
    original_album: Album;

    //  A post can be placed on multiple albums by clicking a "share to other album" button
    @ManyToMany(() => Album, (album) => album.referenced_posts, {
        nullable: true,
        cascade: true,
    })
    other_albums: Album[];

    @Column()
    file_location: string;
}