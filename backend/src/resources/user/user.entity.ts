import { Post } from 'src/resources/user_created/posts/post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../user_created/comments/comment.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(type => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => Album, (album) => album.user)
  @Field(type => [Album], { nullable: true })
  albums?: Album[];
  
  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(type => [Comment], { nullable: true })
  comments?: Comment[];

  @Column({
    unique: true
  })
  @Field()
  username: string;

  @CreateDateColumn()
  @Field((type) => Int)
  created_at: number;

  @UpdateDateColumn()
  @Field((type) => Int)
  updated_at: number;
}
