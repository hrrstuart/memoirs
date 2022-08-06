import { Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseColumns } from "../BaseColumns";
import { Post } from "../Post";
import { User } from "../User";

@Entity()
export class Follow extends BaseColumns {

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true
    })
    follower: User;

    //  Posts that aren't originally stored in album but have been embedded in it
    @OneToMany(() => Post, (post) => post.other_albums)
    following: Post[];

    @OneToOne(() => Follow)
    followType: string;

}