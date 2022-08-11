import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from 'src/resources/user/user.entity';
import { Post } from '../posts/post.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment])
  comments() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment)
  comment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @ResolveField(returns => User)
  user(@Parent() comment: Comment): Promise<User> {
    return this.commentsService.getOwner(comment.userId)
  }
}
