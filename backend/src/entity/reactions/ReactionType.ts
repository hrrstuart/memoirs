import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ReactionToType {
    ALBUM = "album",
    COMMENT = "comment",
    POST = "post"
}

@Entity()
export class ReactionType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        type: "enum",
        enum: ReactionToType
    })
    type: ReactionToType;

}