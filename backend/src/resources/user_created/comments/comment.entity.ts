import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/resources/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
@ObjectType()
export class Comment {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updated_at: Date;

  @Column({ length: 280 })
  @Field()
  content: string;

  @Column()
  @Field()
  user_id: string;

  @Column()
  @Field()
  post_id: string;

  @ManyToOne(type => User, (user) => user.comments)
  @Field(type => User)
  user: User;

  @ManyToOne(type => Post, (post) => post.comments)
  @Field(type => Post)
  post: Post;

}
