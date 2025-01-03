import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CommentLike } from '../comment_likes/commentlike.entity';
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
  userId: string;

  @Column()
  @Field()
  postId: string;

  @ManyToOne(type => User, (user) => user.comments, {
    onDelete: "CASCADE"
  })
  @Field(type => User)
  user: User;

  @ManyToOne(type => Post, (post) => post.comments, {
    onDelete: "CASCADE"
  })
  @Field(type => Post)
  post: Post;

  @OneToMany(type => CommentLike, (commentLike) => commentLike.comment)
  @Field(type => [CommentLike])
  likes: CommentLike[];

}
