import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity';
import { User } from 'src/resources/user_relations/user/user.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  userId: string;

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

  @OneToMany(() => Like, (like) => like.post)
  @Field(() => [Like])
  likes: Like[];

  @Column()
  @Field()
  image_url: string;
}
