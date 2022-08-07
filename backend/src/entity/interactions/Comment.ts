import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseColumns } from "../BaseColumns";
import { Post } from "./Post";
import { User } from "../User";

@Entity()
export class Comment extends BaseColumns {

    @Column()
    content: string;

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.comments)
    user_id: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post_id: Post[];

}