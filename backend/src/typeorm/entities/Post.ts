import { Column, Entity, ManyToOne } from 'typeorm';

// Entities
import { Album } from './Album';
import { BasicEntity } from './BasicEntity';
import { User } from './User';

@Entity()
export class Post extends BasicEntity {

  @Column({ nullable: true })
  description: string;

  @Column()
  image_url: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE"
  })
  owner: User;

  @ManyToOne(() => Album, (album) => album.posts, {
    onDelete: "CASCADE"
  })
  album: Album;

}