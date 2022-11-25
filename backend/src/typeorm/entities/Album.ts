import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BasicEntity } from "./BasicEntity";
import { Post } from "./Post";
import { User } from "./User";

export enum AlbumPrivacy {
    MY_EYES_ONLY,
    MEMBERS_ONLY,
    FOLLOWERS_ONLY,
    PUBLIC
}

@Entity()
export class Album extends BasicEntity {

    @Column({ type: "varchar", length: 15 })
    title: string;

    @Column({
        type: "enum",
        enum: AlbumPrivacy,
        default: AlbumPrivacy.MY_EYES_ONLY
    })
    privacy: AlbumPrivacy;

    @Column({ type: "varchar", length: 155, nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.albums, {
        onDelete: "CASCADE",
    })
    owner: User;

    @OneToMany(() => Post, (post) => post.album)
    posts: Post[];

}