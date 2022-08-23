import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
// Related entities
import { User } from 'src/resources/user_relations/user/user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { AlbumMember } from 'src/resources/user_relations/album_member/album-member.entity';

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

  @ManyToOne(type => User, user => user.albums)
  @Field(type => User)
  user: User;

  @OneToMany(type => Post, post => post.album)
  @Field(type => [Post])
  posts: Post[];

  @OneToMany(() => Post, (post) => post.referencedIn)
  @Field(() => [Post])
  referencedPosts: Post[];

  /* Information that describes album */
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

}
