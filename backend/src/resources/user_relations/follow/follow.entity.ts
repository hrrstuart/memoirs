import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@ObjectType()
export class Follow {

	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Column()
	@Field()
	follower_id: string;

	@Column()
	@Field()
	following_id: string;

	@ManyToOne(type => User, (user) => user.following)
	@Field(type => User)
	follower: User;

}
