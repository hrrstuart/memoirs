import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Album } from 'src/resources/user_created/albums/album.entity';
import { User } from 'src/resources/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  album_id: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Album, (album) => album.posts)
  @Field(() => Album)
  album: Album;

  @Column()
  @Field()
  image_url: string;
}
