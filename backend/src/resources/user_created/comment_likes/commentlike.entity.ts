import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity()
@ObjectType()
export class CommentLike {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @CreateDateColumn()
  @Field(type => Date)
  created_at: Date;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  commentId: string;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: "CASCADE"
  })
  @Field(type => User)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    onDelete: "CASCADE"
  })
  @Field(type => Comment)
  comment: Comment;

}
