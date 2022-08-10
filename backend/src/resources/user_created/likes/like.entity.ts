import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/resources/user/user.entity';
import { Column, CreateDateColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParentType } from './dto/create-like.input';

@ObjectType()
export class Like {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @Column()
  @Field()
  user_id: string;

  @Column()
  @Field()
  parent_id: string;

  @Column()
  @Field()
  parent_type: string;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(type => User)
  user: User;

}
