import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./BasicEntity";
import { Post } from "./Post";
import { User } from "./User";

export enum AlbumViewingPrivacy {
    MY_EYES_ONLY = "MY_EYES_ONLY",
    MEMBERS_ONLY = "MEMBERS_ONLY",
    FOLLOWERS_ONLY = "FOLLOWERS_ONLY",
    PUBLIC = "PUBLIC"
}

@Entity()
export class Album extends Base {

    @Column({ type: "varchar", length: 15 })
    title: string;

    @Column({
        type: "enum",
        enum: AlbumViewingPrivacy,
        default: AlbumViewingPrivacy.MY_EYES_ONLY
    })
    viewingPrivacy: AlbumViewingPrivacy;

    @Column({ type: "varchar", length: 155, nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.albums, {
        onDelete: "CASCADE",
    })
    owner: User;

    @OneToMany(() => Post, (post) => post.album)
    posts: Post[];

}