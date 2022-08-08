import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @Column()
  @Field()
  username: string;

  @CreateDateColumn()
  @Field((type) => Int)
  created_at: number;

  @UpdateDateColumn()
  @Field((type) => Int)
  updated_at: number;
}
