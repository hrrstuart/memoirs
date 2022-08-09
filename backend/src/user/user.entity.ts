import { Post } from 'src/posts/post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from 'src/albums/album.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field((type) => String)
  id: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(type => [Post], { nullable: true })
  posts?: Post[];

  @OneToMany(() => Album, (album) => album.user_id)
  @Field(type => [Album], { nullable: true })
  albums?: Album[];

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
