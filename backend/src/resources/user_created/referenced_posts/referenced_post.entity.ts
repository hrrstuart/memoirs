import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Album } from '../albums/album.entity';
import { Post } from '../posts/post.entity';
import { User } from 'src/resources/user_relations/user/user.entity';

@ObjectType()
@Entity()
export class ReferencedPost {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  postId: string;

  @Column()
  @Field()
  albumId: string;

  @ManyToOne(type => Album, (album) => album.referencedPosts)
  @Field(type => Album)
  album: Album;

  @ManyToOne(type => Post, (post) => post.referencedIn)
  @Field(type => Post)
  post: Post;

}
