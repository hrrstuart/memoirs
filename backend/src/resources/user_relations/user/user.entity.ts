import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../../user_created/comments/comment.entity';
import { PostLike } from '../../user_created/post_likes/postlike.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { Follow } from '../follow/follow.entity';
import { AlbumMember } from '../album_member/album-member.entity';
import { ReferencedPost } from 'src/resources/user_created/referenced_posts/referenced_post.entity';

@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(type => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => ReferencedPost, (referencedPost) => referencedPost.user)
  @Field(type => [ReferencedPost], { nullable: true })
  referencedPosts?: ReferencedPost[];

  @OneToMany(() => Album, (album) => album.user)
  @Field(type => [Album], { nullable: true })
  albums?: Album[];
  
  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(type => [Comment], { nullable: true })
  comments?: Comment[];

  @OneToMany(() => PostLike, (like) => like.user)
  @Field(type => [PostLike], { nullable: true })
  likes?: PostLike[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  @Field(type => [Follow], { nullable: true })
  following?: Follow[];

  @OneToMany(() => AlbumMember, (albumMember) => albumMember.user)
  @Field(type => [AlbumMember], { nullable: true })
  albumMemberships: AlbumMember[];

  @Column({
    unique: true
  })
  @Field()
  username: string;

  @Column()
  @Field({ nullable: true })
  password?: string;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updated_at: Date;

}
