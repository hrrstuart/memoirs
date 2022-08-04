import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Album {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // This isn't showing on database
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true
    })
    owner: User;

    @OneToMany(() => Post, (post) => post.original_album) 
    posts: Post[];

    //  Posts that aren't originally stored in album but have been embedded in it
    @OneToMany(() => Post, (post) => post.other_albums)
    referenced_posts: Post[];

}