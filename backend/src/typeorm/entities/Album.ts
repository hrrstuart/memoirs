import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BasicEntity } from "./BasicEntity";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Album extends BasicEntity {

    @Column({ type: "varchar", length: 15 })
    title: string;

    @Column({ type: "varchar", length: 155, nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.albums, {
        onDelete: "CASCADE",
    })
    owner: User;

    @OneToMany(() => Post, (post) => post.album)
    posts: Post[]

}