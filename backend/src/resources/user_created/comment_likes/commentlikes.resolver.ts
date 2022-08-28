import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CommentLikesService } from './commentlikes.service';
import { CreateCommentLikeInput } from './dto/create-like.input';

// Entities
import { CommentLike } from './commentlike.entity';
import { Post } from '../posts/post.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { Comment } from '../comments/comment.entity';

@Resolver(() => CommentLike)
export class CommentLikesResolver {
  constructor(private readonly likesService: CommentLikesService) {}

  @Mutation(() => CommentLike)
  @UseGuards(AuthenticatedGuard)
  createCommentLike(@Args('createCommentLikeInput') createCommentLikeInput: CreateCommentLikeInput, @Context() context) {
    return this.likesService.create(context.req.user.id, createCommentLikeInput);
  }

  @Query(() => [CommentLike])
  commentLikes() {
    return this.likesService.findAll();
  }

  @ResolveField(returns => User)
  user(@Parent() like: CommentLike): Promise<User> {
    return this.likesService.getOwner(like.userId);
  }

  @ResolveField(returns => Comment)
  post(@Parent() commentLike: CommentLike): Promise<Comment> {
    return this.likesService.getComment(commentLike.commentId);
  }
}
