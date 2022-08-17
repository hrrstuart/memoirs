import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  @UseGuards(AuthenticatedGuard)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput, @Context() context) {
    return this.followService.create(createFollowInput, context.req.user.id);
  }

  @Query(() => [Follow])
  follows() {
    return this.followService.findAll();
  }

  @Query(() => Follow, { description: "Get all followers of either an album or user" })
  findFollowers(@Args('id', { type: () => String }) id: string) {
    return this.followService.findFollowers(id);
  }

  @Query(() => [Follow], { description: "Find all users/albums a user is following" })
  findFollowing(@Args('user_id', { type: () => String }) user_id: string) {
    return this.followService.findFollowing(user_id)
  }

  @ResolveField(returns => User)
  follower(@Parent() follow: Follow): Promise<User> {
    return this.followService.getFollower(follow.followerId);
  }
}
