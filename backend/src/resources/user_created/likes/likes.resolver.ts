import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { User } from 'src/resources/user/user.entity';
import { Post } from '../posts/post.entity';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @Mutation(() => Like)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likesService.create(createLikeInput);
  }

  @Query(() => [Like])
  likes() {
    return this.likesService.findAll();
  }

  @Query(() => Like, { name: 'like' })
  like(@Args('id', { type: () => String }) id: string) {
    return this.likesService.findOne(id);
  }

  @ResolveField(returns => User)
  user(@Parent() like: Like): Promise<User> {
    return this.likesService.getOwner(like.user_id);
  }

  @ResolveField(returns => Post)
  post(@Parent() like: Like): Promise<Post> {
    return this.likesService.getPost(like.parent_id);
  }
}
