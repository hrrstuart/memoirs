import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UserFollowService } from './user_follow.service';
import { UserFollow } from './user_follow.entity';
import { CreateUserFollowInput } from './dto/create-user_follow.input';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

@Resolver(() => UserFollow)
export class UserFollowResolver {
  constructor(private readonly userFollowService: UserFollowService) {}

  @Mutation(() => UserFollow)
  @UseGuards(AuthenticatedGuard)
  createUserFollow(@Args('createUserFollowInput') createUserFollowInput: CreateUserFollowInput, @Context() context) {
    return this.userFollowService.create(createUserFollowInput, context.req.user.id);
  }

  @Query(() => [UserFollow])
  userFollows() {
    return this.userFollowService.findAll();
  }

  @Query(() => [UserFollow])
  findUserFollowers(@Args('userId', { type: () => String }) id: string): Promise<UserFollow[]> {
    return this.userFollowService.findFollowers(id);
  }

  @Query(() => [UserFollow])
  findUserFollowing(@Args('userId', { type: () => String }) userId: string) {
    return this.userFollowService.findFollowing(userId)
  }

  @ResolveField(returns => User)
  follower(@Parent() follow: UserFollow): Promise<User> {
    return this.userFollowService.getUser(follow.followerId);
  }

  @ResolveField(returns => User)
  following(@Parent() follow: UserFollow): Promise<User> {
    return this.userFollowService.getUser(follow.followingId);
  }
}
