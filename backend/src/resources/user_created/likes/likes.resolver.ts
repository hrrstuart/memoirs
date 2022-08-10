import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';

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
}
