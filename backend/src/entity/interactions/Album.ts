import { Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseColumns } from "../BaseColumns";
import { Post } from "./Post";
import { User } from "../User";

@Entity()
export class Album extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true
    })
    user_id: User;

    @OneToMany(() => Post, (post) => post.original_album) 
    posts: Post[];

    //  Posts that aren't originally stored in album but have been embedded in it
    @OneToMany(() => Post, (post) => post.other_albums)
    referenced_posts: Post[];

}