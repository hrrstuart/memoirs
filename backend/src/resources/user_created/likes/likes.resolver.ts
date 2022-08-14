import { Resolver, Query, Mutation, Args, ResolveField, Parent, Context } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { CreateLikeInput } from './dto/create-like.input';

// Entities
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';
import { User } from 'src/resources/user/user.entity';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => Like)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput, @Context() context) {
    return this.likesService.create(context.req.user.id, createLikeInput);
  }

  @Query(() => [Like])
  likes() {
    return this.likesService.findAll();
  }

  @Query(() => Like, { name: 'like' })
  getLike(@Args('id', { type: () => String }) id: string) {
    return this.likesService.findOne(id);
  }

  @ResolveField(returns => User)
  user(@Parent() like: Like): Promise<User> {
    return this.likesService.getOwner(like.userId);
  }

  @ResolveField(returns => Post)
  post(@Parent() like: Like): Promise<Post> {
    return this.likesService.getPost(like.parent_id);
  }
}
