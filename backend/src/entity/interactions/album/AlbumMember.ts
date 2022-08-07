import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Album } from "./Album";
import { BaseColumns } from "../../BaseColumns";
import { Post } from "../post/Post";
import { User } from "../../User";

@Entity()
export class AlbumMember extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.albums_part_of)
    member_id: User;

    @ManyToOne(() => Album, (album) => album.members)
    album_id: Album;

    @Column()
    is_admin: boolean;

}