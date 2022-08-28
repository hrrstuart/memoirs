import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
// Related entities
import { User } from 'src/resources/user_relations/user/user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { AlbumMember } from 'src/resources/user_relations/album_member/album-member.entity';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';
import { AlbumFollow } from 'src/resources/user_relations/album_follow/album_follow.entity';

@Entity()
@ObjectType()
export class Album {

  @PrimaryGeneratedColumn("uuid")
  @Field(type => String)
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updated_at: Date;

  @OneToMany(() => AlbumMember, (albumMember) => albumMember.album)
  @Field(type => [AlbumMember])
  members: AlbumMember;

  @Column()
  @Field()
  userId: string;

  @ManyToOne(type => User, user => user.albums, {
    onDelete: "CASCADE"
  })
  @Field(type => User)
  user: User;

  @OneToMany(type => Post, post => post.album)
  @Field(type => [Post])
  posts: Post[];

  @OneToMany(type => AlbumFollow, albumFollow => albumFollow.album)
  @Field(type => [AlbumFollow])
  followers: AlbumFollow[];

  @OneToMany(() => ReferencedPost, (referencedPost) => referencedPost.album)
  @Field(() => [ReferencedPost])
  referencedPosts: ReferencedPost[];

  /* Information that describes album */
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

}
