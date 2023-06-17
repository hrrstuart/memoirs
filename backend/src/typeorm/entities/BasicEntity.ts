import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from "typeorm";

export class Base extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;

}