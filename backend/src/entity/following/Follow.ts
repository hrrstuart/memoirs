import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseColumns } from "../BaseColumns";
import { User } from "../User";
import { FollowType } from "./FollowType";

@Entity()
export class Follow extends BaseColumns {

    /**
     * ID of the user who is following something
     */
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true,
    })
    follower_id: User;

    /**
     * ID of the object that the user is following - can either be following an album or a user
     */
    @Column()
    following_id: string;

    /**
     * Define type of what user is following - either album or user
     */
    @OneToOne(() => FollowType, {
        eager: true
    })
    following_type: string;

}