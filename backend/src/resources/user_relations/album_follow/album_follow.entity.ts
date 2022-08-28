import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class AlbumFollow {

	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@CreateDateColumn()
	@Field()
	created_at: Date;

	@UpdateDateColumn()
	@Field()
	updated_at: Date;

	@Column()
	@Field()
	followerId: string;

	@Column()
	@Field()
	albumId: string;

	@ManyToOne(type => User, (user) => user.usersFollowing, {
		onDelete: "CASCADE"
	  })
	@Field(type => User)
	follower: User;

	@ManyToOne(type => Album, (album) => album.followers, {
		onDelete: "CASCADE"
	})
	@Field(type => Album)
	album: Album;

}
