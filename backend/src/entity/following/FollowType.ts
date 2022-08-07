import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum FollowingType {
    ALBUM = "album",
    USER = "user"
}

@Entity()
export class FollowType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        type: "enum",
        enum: FollowingType
    })
    type: FollowingType

}