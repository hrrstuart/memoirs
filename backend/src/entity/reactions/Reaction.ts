import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseColumns } from "../BaseColumns";
import { User } from "../User";
import { ReactionType } from "./ReactionType";

@Entity()
export class Reaction extends BaseColumns {

    /**
     * ID of the user who reacted
     */
    @ManyToOne(() => User, (user) => user.albums, {
        nullable: true,
    })
    user_id: User;

    /**
     * ID of the object that the user reacted to - can either be react to an album or a post
     */
    @Column()
    parent_id: string;

    /**
     * Define type of item that is liked - either album or post
     */
    @OneToOne(() => ReactionType, {
        eager: true
    })
    reaction_type: string;

}