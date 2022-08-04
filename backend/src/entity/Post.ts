import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import { Album } from "./Album";
import { User } from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

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