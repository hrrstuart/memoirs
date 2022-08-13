import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';

// Entities
import { Comment } from './comment.entity';
import { User } from 'src/resources/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(AuthenticatedGuard)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput, @Context() context) {
    return this.commentsService.create(context.req.user.id, createCommentInput);
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
