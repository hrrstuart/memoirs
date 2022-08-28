import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/post.entity';
import { LikeType } from './likes.enum';

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
  parentId: string;

  @Column({
    type: "enum",
    enum: LikeType
  })
  @Field(type => LikeType)
  parentType: LikeType;

  @ManyToOne(() => User, (user) => user.likes)
  @Field(type => User)
  user: User;

  // @ManyToOne(() => Post, (post) => post.likes)
  // @Field(type => Post)
  // post: Post;

}
