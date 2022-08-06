import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FollowType {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    type: string;

}