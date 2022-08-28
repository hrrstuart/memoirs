import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../comments/comment.entity';
import { PostLike } from '../post_likes/postlike.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updated_at: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  userId: string;

  @OneToMany(() => ReferencedPost, (referencedPost) => referencedPost.post)
  @Field(() => [ReferencedPost])
  referenced: ReferencedPost[];

  @Column()
  @Field()
  albumId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Album, (album) => album.posts)
  @Field(() => Album)
  album: Album;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  @Field(() => [PostLike])
  likes: PostLike[];

  @Column()
  @Field()
  image_url: string;
}
