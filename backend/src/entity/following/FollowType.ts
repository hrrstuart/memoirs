import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FollowType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    type: string;

}