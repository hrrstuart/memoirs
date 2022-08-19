import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../../user_created/comments/comment.entity';
import { Like } from '../../user_created/likes/like.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { Follow } from '../follow/follow.entity';
import { User } from '../user/user.entity';
import { cp } from 'fs';

@Entity()
@ObjectType()
export class AlbumMember {

  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @Column(() => Boolean)
  @Field(type => Boolean, { defaultValue: false })
  isAdmin: boolean;

  @Column()
  @Field(type => String)
  albumId: string;

  @Column()
  @Field(type => String)
  userId: string;

  @ManyToOne(() => Album, (album) => album.members)
  @Field(type => Album)
  album: Album;

  @ManyToOne(() => User, (user) => user.albumMemberships)
  @Field(type => User)
  user: User;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updated_at: Date;

}
