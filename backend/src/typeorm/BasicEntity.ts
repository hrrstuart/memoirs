import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class BasicEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: number;

    @UpdateDateColumn()
    updated_at: number;

}