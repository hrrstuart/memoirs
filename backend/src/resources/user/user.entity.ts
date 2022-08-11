import { Post } from 'src/resources/user_created/posts/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../user_created/comments/comment.entity';
import { Like } from '../user_created/likes/like.entity';

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

  @OneToMany(() => Like, (like) => like.user)
  @Field(type => [Like], { nullable: true })
  likes?: Like[];

  @Column({
    unique: true
  })
  @Field()
  username: string;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updated_at: Date;

}
