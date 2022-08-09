import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// Related entities
import { User } from 'src/user/user.entity';
import { Post } from 'src/posts/post.entity';

@Entity()
@ObjectType()
export class Album {

  @PrimaryGeneratedColumn("uuid")
  @Field(type => String)
  id: string;

  @Column()
  @Field()
  user_id: string;

  @ManyToOne(type => User, user => user.albums)
  @Field(type => User)
  user: User;

  @OneToMany(type => Post, post => post.album)
  @Field(type => [Post])
  posts: Post[];

  /* Information that describes album */
  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

}
