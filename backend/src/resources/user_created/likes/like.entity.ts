import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity()
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
  userId: string;

  @Column()
  @Field()
  parent_id: string;

  @Column()
  @Field()
  parent_type: string;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(type => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @Field(type => Post)
  post: Post;

}
