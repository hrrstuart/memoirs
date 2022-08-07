import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReactionType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    type: string;

}