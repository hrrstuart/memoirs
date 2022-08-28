import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { PostLikesService } from './postlikes.service';
import { CreateLikeInput } from './dto/create-like.input';

// Entities
import { PostLike } from './postlike.entity';
import { Post } from '../posts/post.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

@Resolver(() => PostLike)
export class LikesResolver {
  constructor(private readonly likesService: PostLikesService) {}

  @Mutation(() => PostLike)
  @UseGuards(AuthenticatedGuard)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput, @Context() context) {
    return this.likesService.create(context.req.user.id, createLikeInput);
  }

  @Query(() => [PostLike])
  likes() {
    return this.likesService.findAll();
  }

  @ResolveField(returns => User)
  user(@Parent() like: PostLike): Promise<User> {
    return this.likesService.getOwner(like.userId);
  }

  @ResolveField(returns => Post)
  post(@Parent() like: PostLike): Promise<Post> {
    return this.likesService.getPost(like.postId);
  }
}
