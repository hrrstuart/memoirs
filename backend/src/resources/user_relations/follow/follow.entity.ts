import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Follow {

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

	@ManyToOne(type => User, (user) => user.follows)
	@Field(type => User)
	follower: User;

}
