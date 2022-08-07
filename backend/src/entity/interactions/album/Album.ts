import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseColumns } from "../../BaseColumns";
import { Post } from "../post/Post";
import { User } from "../../User";
import { AlbumMember } from "./AlbumMember";

@Entity()
export class Album extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true
    })
    user_id: User;

    @OneToMany(() => Post, (post) => post.original_album) 
    posts: Post[];

    @OneToMany(() => AlbumMember, (member) => member.album_id)
    members: AlbumMember[];

    //  Posts that aren't originally stored in album but have been embedded in it
    @OneToMany(() => Post, (post) => post.other_albums)
    referenced_posts: Post[];

}