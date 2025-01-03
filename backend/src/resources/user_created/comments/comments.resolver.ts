import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';

// Entities
import { Comment } from './comment.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { Post } from '../posts/post.entity';
import { CommentLike } from '../comment_likes/commentlike.entity';

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
  getComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @ResolveField(returns => Post)
  post(@Parent() comment: Comment): Promise<Post> {
    return this.commentsService.getPost(comment.postId);
  }

  @ResolveField(returns => User)
  user(@Parent() comment: Comment): Promise<User> {
    return this.commentsService.getOwner(comment.userId)
  }

  @ResolveField(returns => CommentLike)
  likes(@Parent() comment: Comment): Promise<CommentLike[]> {
    return this.commentsService.getLikes(comment.id);
  }

}
