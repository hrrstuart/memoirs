import { Column, Entity, ManyToOne } from 'typeorm';

// Entities
import { Album } from './Album';
import { Base } from './BasicEntity';
import { User } from './User';

@Entity()
export class Post extends Base {

  @Column({ nullable: true })
  description: string;

  @Column()
  image_url: string;

  /*  Relations  */
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE"
  })
  owner: User;

  @ManyToOne(() => Album, (album) => album.posts, {
    onDelete: "CASCADE"
  })
  album: Album;

}