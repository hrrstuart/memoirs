import { Field, Int, ObjectType } from '@nestjs/graphql';
import {  CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updated_at: Date;

}
