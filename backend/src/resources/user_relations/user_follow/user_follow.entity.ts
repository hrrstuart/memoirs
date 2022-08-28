import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class UserFollow {

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
	followingId: string;

	@ManyToOne(type => User, (user) => user.following, {
		onDelete: "CASCADE"
	  })
	@Field(type => User)
	follower: User;

	@ManyToOne(type => User, (user) => user.followers, {
		onDelete: "CASCADE"
	})
	@Field(type => User)
	following: User;

}
